import { writable } from 'svelte/store';
import { inboxEmails } from './emails/inboxEmails';
import { sentEmails } from './emails/sentEmails';
import { draftEmails } from './emails/draftEmails';
import { spamEmails } from './emails/spamEmails';
import { archivedEmails } from './emails/archivedEmails';
import { trashEmails } from './emails/trashEmails';

import { push, pop, replace } from 'svelte-spa-router';

class EmailList {
  // list of emails
  list;

  constructor(list) {
    this.list = list;
  }

  get read() {
    return this.list.filter((email) => email.read);
  }

  get unread() {
    return this.list.filter((email) => !email.read);
  }

  get starred() {
    return this.list.filter((email) => email.starred);
  }
}

// holds the list of emails to display
export const inbox = writable([]);

export let currentPage = writable('');
export let currentSort = writable('');

// localStorage can only hold strings so u gotta JSON.parse them back into booleans
export let bannerClosed = writable(
  localStorage.getItem('bannerClosed') ? JSON.parse(localStorage.getItem('bannerClosed')) : false
);

export let landingOpen = writable(
  localStorage.getItem('landingOpen') ? JSON.parse(localStorage.getItem('landingOpen')) : true
);

const emailManager = {
  Inbox: new EmailList(inboxEmails),
  Starred: new EmailList(inboxEmails.filter((email) => email.starred)),
  Sent: new EmailList(sentEmails),
  Drafts: new EmailList(draftEmails),
  Archived: new EmailList(archivedEmails),
  Spam: new EmailList(spamEmails),
  Trash: new EmailList(trashEmails),
};

// inbox routing
const routeSite = () => {
  const route = window.location.hash.substring(1).split('/');

  if (route.includes('bug')) {
    push('/bug');
    currentPage.set('bug');
    return;
  }

  currentPage.set(route[0]);
  currentSort.set(route[1]);

  let emailList;

  switch (route[1]) {
    case 'all':
      emailList = emailManager[route[0]].list;
      break;
    case 'read':
      emailList = emailManager[route[0]].read;
      break;
    case 'unread':
      emailList = emailManager[route[0]].unread;
      break;
    default:
      emailList = emailManager[route[0]].list;
  }
  inbox.set(emailList);
};

// init stuff
if (!window.location.hash) {
  console.log('no hash found');
  window.location.hash = '#Inbox/all';
}
routeSite();

window.addEventListener('hashchange', routeSite);
