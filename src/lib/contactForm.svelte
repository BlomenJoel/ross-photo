<script lang="ts">
import Modal from "./Modal.svelte";
    export let data;
    let emailSuccessFull = undefined;
    let firstName: string, lastName: string, contactReason: string, message: string, email: string = '';
    const submit = async () => {
        const data = {firstName, lastName, contactReason, message, email};
        const res = await fetch('send-email.json', 
            { method: 'POST', body: JSON.stringify(data)});

        emailSuccessFull = res.status === 200;
        setTimeout(() => {emailSuccessFull = undefined }, 3000);
    }
</script>
{#if emailSuccessFull}
<Modal on:close={() => emailSuccessFull = false}>
    <span slot="header">
        <h3>Email sent!</h3>
    </span>
</Modal>
{/if}

{#if data}
<h2 class="pb-4">{data.rubric}</h2>


<form on:submit|preventDefault={submit}>
    <div class="d-flex">
        <div>
            <div class="">
                <label for="fname">{data.firstFieldLabel}</label>
                <input required  type="text" id="fname" name="firstname" placeholder="{data.firstFieldPlaceholder}" bind:value={firstName}>
            </div>
            
            <div>
                <label for="lname">{data.secondFieldLabel}</label>
                <input required  type="text" id="lname" name="lastname" placeholder="{data.secondFieldPlaceholder}" bind:value={lastName}>
            </div>
        </div>
        <div>
            <div class="">
                <label for="email">{data.emailFieldLabel}</label>
                <input required  type="email" id="email" name="lastname" placeholder="{data.emailFieldPlaceholder}" bind:value={email}>
            </div>
            
            <div>
                <label for="contactReason">{data.optionFieldLabel}</label>
                <select required id="contactReason" name="contactReason" bind:value={contactReason} >
                    {#each data.options as option }
                    <option value="{option}">{option}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    
    <label for="message">{data.textAreaFieldLabel}</label>
    <textarea required maxlength=1000 id="message" name="message" bind:value={message} placeholder="{data.textAreaFieldPlaceholder}"></textarea>
    
    <input type="submit" value="{data.subminButtonText}">
</form>
{/if}

<style scoped>
    form {
    width: 80%
}

input[type=text], input[type=email], select, textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  resize: vertical;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>