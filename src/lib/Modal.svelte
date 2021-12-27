<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
        const closeModal = () => {
            dispatch('close')
    
        }
    </script>
    
    <div class="modal-wrapper">
        <div class="modal">
            <div class="modal-header">
                <button on:click={closeModal}>x</button>
            </div>
            <div class="modal-body-wrapper">
                <div class="header">
                    <slot name="header"/>
                </div>
                <div class="body">
                    <slot name="body"/>
                </div>
                <div class="button">
                    <slot name="button"/>
                </div>
            </div>
        </div>    
    </div>
    
    <style scoped >
    
        .modal-body-wrapper {
            padding:1rem;
        }
    
        .header, .body {
            margin-bottom: 0.5rem;
        }
    
        .modal-header {
            display: flex;    
            justify-content: flex-end;
            background-color: var(--secondary-color);
        }
        
        button {
            padding: 0.25rem 0.5rem;
            background-color: rgba(0, 0, 0, 0.3);
            color: white;
            position: relative; 
        }
        .modal {
            position: relative;
            margin: auto;
            height: auto;
            width: auto;
            margin-left: auto;
            margin-right: auto;
            text-align: center;    
            background-color: var(--primary-color);
        }
        .modal-wrapper {
            position: fixed;
            height: -webkit-fill-available;
            width: -webkit-fill-available;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(2px);
            z-index: 10;
            top: 0;
            left: 0;
            display: flex;
        }
    </style>