import { writable, get } from 'svelte/store';
import { location, push, pop, replace } from 'svelte-spa-router';

// import all emails but overwrite them if local storage exists
import { inboxEmails } from './emails/inboxEmails';
import { sentEmails } from './emails/sentEmails';
import { draftEmails } from './emails/draftEmails';
import { spamEmails } from './emails/spamEmails';
import { archivedEmails } from './emails/archivedEmails';
import { trashEmails } from './emails/trashEmails';

class EmailList {
  // list of emails
  storeList;

  constructor(list) {
    this.storeList = writable(list);
  }

  get read() {
    return get(this.storeList).filter((email) => email.read);
  }

  get unread() {
    return get(this.storeList).filter((email) => !email.read);
  }

  get starred() {
    return get(this.storeList).filter((email) => email.starred);
  }

  get list() {
    return get(this.storeList);
  }

  markAllUnread() {
    for (let email of get(this.storeList)) {
      email.read = false;
    }
  }
}

// holds the list of emails to display
export const inbox = writable([]);

// localStorage can only hold strings so u gotta JSON.parse them back into booleans
export let bannerClosed = writable(
  localStorage.getItem('bannerClosed') ? JSON.parse(localStorage.getItem('bannerClosed')) : false
);

export let landingOpen = writable(
  localStorage.getItem('landingOpen') ? JSON.parse(localStorage.getItem('landingOpen')) : true
);

const groups = ['Inbox', 'Sent', 'Drafts', 'Spam', 'Archived', 'Trash'];
let emailManager;

if (!localStorage.getItem('Inbox')) {
  // just for the sake of iteration
  const allEmails = [inboxEmails, sentEmails, draftEmails, spamEmails, archivedEmails, trashEmails];

  for (let [index, rawList] of allEmails.entries()) {
    for (let email of rawList) {
      email.group = index; // equivalent to the index of name in group
    }

    // put list in local storage
    localStorage.setItem(groups[index], JSON.stringify(rawList));
  }

  emailManager = {
    Inbox: new EmailList(inboxEmails),
    Starred: new EmailList(inboxEmails.filter((email) => email.starred)),
    Sent: new EmailList(sentEmails),
    Drafts: new EmailList(draftEmails),
    Archived: new EmailList(archivedEmails),
    Spam: new EmailList(spamEmails),
    Trash: new EmailList(trashEmails),
  };
} else {
  const inboxEmailsStorage = JSON.parse(localStorage.getItem('Inbox'));
  const sentEmailsStorage = JSON.parse(localStorage.getItem('Sent'));
  const draftEmailsStorage = JSON.parse(localStorage.getItem('Drafts'));
  const spamEmailsStorage = JSON.parse(localStorage.getItem('Spam'));
  const archivedEmailsStorage = JSON.parse(localStorage.getItem('Archived'));
  const trashEmailsStorage = JSON.parse(localStorage.getItem('Trash'));

  console.log(inboxEmailsStorage);
  emailManager = {
    Inbox: new EmailList(inboxEmailsStorage),
    Starred: new EmailList(inboxEmailsStorage.filter((email) => email.starred)),
    Sent: new EmailList(sentEmailsStorage),
    Drafts: new EmailList(draftEmailsStorage),
    Archived: new EmailList(archivedEmailsStorage),
    Spam: new EmailList(spamEmailsStorage),
    Trash: new EmailList(trashEmailsStorage),
  };
}

// pushs current list into localStorage
export const updateList = (group) => {
  console.log('updating group');
  localStorage.setItem(groups[group], JSON.stringify(emailManager[groups[group]].list));
};

export const resetInbox = () => {
  bannerClosed.update((value) => false);
  landingOpen.update((value) => true);

  for (let emailListObj in emailManager) {
    if (emailListObj !== 'Starred') {
      emailManager[emailListObj].markAllUnread();
      localStorage.setItem(emailListObj, JSON.stringify(emailManager[emailListObj].list));
      routeSite();
    }
  }
};

/************************ ROUTING ***************************/
export let currentPage = writable('');
export let currentSort = writable('');

const routeSite = () => {
  console.log(get(location));

  if (get(location) == '/bug') {
    currentPage.set('bug');
    return;
  }

  const [page, sort] = window.location.hash.substring(1).split('/');

  currentPage.set(page);
  currentSort.set(sort);

  let emailList;

  switch (sort) {
    case 'all':
      emailList = emailManager[page].list;
      break;
    case 'read':
      emailList = emailManager[page].read;
      break;
    case 'unread':
      emailList = emailManager[page].unread;
      break;
    default:
      emailList = emailManager[page].list;
  }
  inbox.set(emailList);
};

// init stuff
if (!window.location.hash) {
  window.location.hash = '#Inbox/all';
}
routeSite();

window.addEventListener('hashchange', routeSite);
