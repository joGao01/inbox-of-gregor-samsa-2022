<script>
  export let open;

  export let senderEmail;
  export let to;
  export let toEmail;
  export let starred;
  export let sender;
  export let subject;
  export let text;
  export let time;
</script>

<div id="modal-box" class="{open ? 'open' : 'closed'}">
  <div id="modal">

    <div id="top-bar">
        <p on:click>Back</p>
    </div>

    <div id="subject-line">
      <p>{subject}</p>

      {#if starred}
        <img src="./assets/starred.svg" alt="unstarred symbol"/>
      {:else}
        <img src="./assets/unstarred.svg" alt="unstarred symbol"/>
      {/if}
      
    </div>
   
    <div id="body-box">
      <div id="text-area">
        <div id="header">
          <div>
            <span id="sender">{sender}</span> <span id="sender-email">&lt;{senderEmail}&gt;</span> 
            <span title={toEmail} id="to">to {to}</span>
          </div>
          <div>{time}</div>
        </div>
  
        <div id="email-body">
          {text}
        </div>
      </div>

      <div id="footer">
        <div id="buttons">
          <span>Reply</span>
          <span>Forward</span>
        </div>
        <textarea disabled></textarea>
      </div>
    </div>
  </div>
</div>

<style>
#modal-box {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0,0,0, 0.28);
}

#modal {
  max-width: 800px;
  width: 90%;
  padding: 10px;
  background-color: white;
}

#top-bar {
  height: 20px;
  width: 100%;

  background-color: #C3D9FF;
}

#top-bar p {
  font-size: 14px;
  text-decoration: underline;
  color: #0901C8;
  cursor: pointer;
  width: fit-content;
  margin: 0;
}

#subject-line {
  display: flex;
  flex-direction: row;
}

#subject-line p {
  font-size: 20px;
  font-weight: bold;
  margin: 12px 0;
}

#subject-line img {
  margin: 0 10px;
}

#body-box {
  border: 1px solid #8C8C8C;
  border-radius: 10px;

}

#text-area {
  padding: 10px;
} 

#header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

#sender {
  color: #0B501D;
  font-weight: bold;
}

#to {
  color: #8C8C8C;
}

#email-body {
  white-space: pre-line;
  margin: 20px 0;
}

#footer {
  width: 100%;
  height: 130px;
  background-color: #EFEFEF;
  border-radius: 0 0 10px 10px;

  display: grid;
  grid-template-rows: 30px 75px;
  grid-template-columns: 90%;
  justify-content: center;
  align-content: center;
}

#footer textarea {
  border: 1px solid #8C8C8C;
  background-color: white;
  max-width: 740px;
  box-shadow: inset 1px 1px 1px 1px rgba(136, 136, 136, 0.25);
  cursor: not-allowed;
  resize: none;
}

#footer span {
  color: rgba(9,1,200,0.5);
  text-decoration: underline;
  cursor: not-allowed;
}

#modal-box.open{
  display: grid;
  align-items: center;
  justify-items: center;
}

#modal-box.closed{
  display: none;
}

</style>