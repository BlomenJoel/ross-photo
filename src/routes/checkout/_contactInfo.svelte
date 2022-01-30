<script lang="ts">
    export let purchase;
    export let contactInfo;
</script>

<form on:submit|preventDefault={purchase}>
    <div>
        <label for="fname">First name</label>
        <input required  type="text" id="fname" name="firstname" placeholder="John" bind:value={contactInfo.firstName}>
    </div>
    
    <div>
        <label for="lname">Last name</label>
        <input required  type="text" id="lname" name="lastname" placeholder="Johnsson" bind:value={contactInfo.lastName}>
    </div>
    <div>
        <label for="email">Email</label>
        <input required  type="email" id="email" name="email" placeholder="john-johnsson@gmail.com" bind:value={contactInfo.email}>
    </div>
    <div>
        <label for="streetAdress1">Street adress</label>
        <input required  type="text" id="streetAdress1" name="streetAddress1" placeholder="Tavastgatan 16, lgh 10" bind:value={contactInfo.address.streetAdress1}>
    </div>
    <div>
        <label for="c0">C/O</label>
        <input type="text" id="c0" name="co" placeholder="C/O" bind:value={contactInfo.address.co}>
    </div>
    <div>
        <label for="postalCode">Postal code</label>
        <input required  type="number" id="postalCode" name="postalCode" placeholder="41119" bind:value={contactInfo.address.postalCode}>
    </div>
    <div>
        <label for="city">City</label>
        <input required  type="text" id="city" name="city" placeholder="Gothenburg" bind:value={contactInfo.address.city}>
    </div>
    <div>
        <label for="country">Country</label>
        <input required  type="text" id="country" name="country" placeholder="Sweden" bind:value={contactInfo.address.country}>
    </div>
    <div>
        <label for="phone">Phone</label>
        <input required  type="text" id="phone" name="phone" placeholder="+46 706 123 123" bind:value={contactInfo.address.phone}>
    </div>
    <input type="submit" value="Purchase">
</form>