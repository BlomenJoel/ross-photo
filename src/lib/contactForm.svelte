<script lang="ts">
import EmailModal from "./emailModal.svelte";
export let data;    
    let triggerSubmit = false;
    const contactData =  {firstName: '', lastName: '', contactReason: '', message: '', email: ''};
</script>

<EmailModal 
    data={contactData} 
    bind:triggerSubmit={triggerSubmit} 
>
<span slot="header">
    <h3>Email sent!</h3>
</span>
</EmailModal>

{#if data}
<h2 class="pb-4">{data.rubric}</h2>
<form on:submit|preventDefault={() => triggerSubmit = true}>
    <div class="d-flex">
        <div>
            <div class="">
                <label for="fname">{data.firstFieldLabel}</label>
                <input required  type="text" id="fname" name="firstname" placeholder="{data.firstFieldPlaceholder}" bind:value={contactData.firstName}>
            </div>
            
            <div>
                <label for="lname">{data.secondFieldLabel}</label>
                <input required  type="text" id="lname" name="lastname" placeholder="{data.secondFieldPlaceholder}" bind:value={contactData.lastName}>
            </div>
        </div>
        <div>
            <div class="">
                <label for="email">{data.emailFieldLabel}</label>
                <input required  type="email" id="email" name="email" placeholder="{data.emailFieldPlaceholder}" bind:value={contactData.email}>
            </div>
            
            <div>
                <label for="contactReason">{data.optionFieldLabel}</label>
                <select required id="contactReason" name="contactReason" bind:value={contactData.contactReason} >
                    {#each data.options as option }
                    <option value="{option}">{option}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    
    <label for="message">{data.textAreaFieldLabel}</label>
    <textarea required maxlength=1000 id="message" name="message" bind:value={contactData.message} placeholder="{data.textAreaFieldPlaceholder}"></textarea>
    
    <input type="submit" value="{data.subminButtonText}">
</form>
{/if}

<style scoped>
form {
    width: 80%
}
@media (max-width: 480px) {
        form {
            width: 100%
        }
}
</style>