<script>
  /**
   * This component is the preview of the email in the inbox. It takes an email object. On click, it displays a modal
  */

  import Modal from './modal.svelte';
  import { updateList } from '../stores';

  export let group;
  export let senderEmail;
  export let to;
  export let toemail;
  export let starred;
  export let sender;
  export let subject;
  export let text;
  export let time;
  export let read;

  let reading = false;

  const readEmail = () => {
    if (!read) {
      read = true;
      updateList(group);
    }
    reading = !reading;
  }

  const emailObj = {senderEmail, to, toEmail:toemail, starred, sender, subject, text, time};
</script>

<div class="email-preview {read ? 'read' : 'unread'}" on:click={readEmail}>
  <div class="star">
    {#if starred}
      <img src="assets/starred.svg" alt="starred icon"/>
    {:else}
      <img src="assets/unstarred.svg" alt="unstarred icon"/>
    {/if}
  </div>
  <div class="sender">{sender}</div>
  <div class="preview">{subject}</div>
  <div class="datetime">{time}</div>
</div>

<Modal {...emailObj} open={reading} on:click={()=>{reading = !reading}}>
  
</Modal>

<style>
  .email-preview {
    display: grid;
    align-items: center;

    background-color: white;
    padding: 3px 0;
    margin: 0;
    border-bottom: 1px solid #C4C4C4;

    cursor: pointer;
  }

  /* medium screens */
  @media (max-width: 800px) {
    .email-preview {
      grid-template-areas: 
        "star sender datetime"
        "star preview preview";

      grid-template-columns: 30px auto 70px;
    }
  }

  /* larger screens */
  @media (min-width: 801px) {
    .email-preview {
      grid-template-areas: "star sender preview datetime";
      grid-template-columns: 30px minmax(150px,265px) minmax(300px, 855px) 70px;
    }
  }

  .read {
    background-color: #E7EEF8;
  }

  .unread {
    font-weight: bold;
  }

  .star {
    display: grid;
    align-self: center;
    justify-self: center;
    grid-area: star;
  }

  .sender {
    grid-area: sender;
  }

  .preview {
    grid-area: preview;
  }

  .datetime {
    grid-area: datetime;
  }

  .sender,
  .preview {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  
</style>