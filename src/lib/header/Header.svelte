<script lang="ts">
	import { cart as storeCart } from '../../store/cart'
	let cart = undefined, animate = false;
	storeCart.useLocalStorage();
	const cartAnimation = () => {
		animate = true;
		setTimeout(() => {
			animate = false;
		}, 300);
	}

	storeCart.subscribe((data) => {
		cart = data;
		cartAnimation()
	})
</script>

<header>
	
	<nav>
		<div class="corner">
		</div>
		<a href="/" class="middle">
			Higher perspective droning
			<img alt="drone" src="/drone.png" class="icon drone"/>
		</a>
		<a class="corner relative" href="/checkout">
			{#if cart && cart.length > 0}
			<div class="cart" class:shake={animate} >
				<img alt="cart" src="/shopping-cart-solid.svg" class="icon"/>
				<span class="cart-count">
					{cart.length}
				</span>
			</div>
					
			{/if}
		</a>
	</nav>

</header>

<style scoped>
.cart-count {
	right: 0.35rem;
    top: -0.6rem;
    z-index: 2;
    color: var(--accent-color);
	position: absolute;
	font-weight: bolder;
	font-size: 1.25em;
}	
.icon {
	transition: all 0.3s;
	max-width: 3rem;
	max-height: 3rem;
}

.cart {
	transition: all 0.4s;
}
header {
	justify-content: space-between;
	position: fixed;
    z-index: 3;
}
a:hover .drone{
	transform: translate(-1rem);
}
.cart:hover {
	transform: translateX(1rem);
	transition: all 0.1s;
}

	.corner {
		width: 3rem;
		height: 3rem;
	}

	nav {
		display: flex;
		justify-content: space-between;
		--background: rgba(255, 255, 255, 0.7);
		align-items: center;
		text-transform: uppercase;
		cursor:pointer;
	}

	nav .middle {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1rem;
		padding-top:1rem;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
	.shake {
		animation: shakeCart 0.3s ease-in-out;
	}
	@keyframes shakeCart {
		25% {
			transform: translateX(6px);
		}
		50% {
			transform: translateX(-4px);
		}
		75% {
			transform: translateX(2px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
