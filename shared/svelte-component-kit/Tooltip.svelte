<script>
	export let direction = 'up';
	export let parent = undefined;
	export let width = 200;
	
	let tooltipRef;
	let tooltipStyles;
	let triangleRef;
	let triangleStyles;
	let horizontalBleed;
	let verticalBleed;
	

	const generateStyles = (styles) => Object.entries(styles)
		.reduce((a, [property, value]) => [...a, `${property}: ${value};`], [])
		.join(' ')

	tooltipStyles = generateStyles({
		width: `${width}px`
	})
	
	$: {
		if (tooltipRef && parent) {
			const vertical = direction === 'up' || direction === 'down';
			const dirY = direction === 'up' ? 1 : -1;
			const dirX = direction === 'left' ? 1 : -1;

			horizontalBleed = 0;
			verticalBleed = 0;
			
			const { innerWidth, innerHeight } = window;		
			const { clientWidth: childW, clientHeight: childH } = tooltipRef;
			const {
				offsetLeft: parentX,
				offsetTop: parentY,
				clientWidth: parentW,
				clientHeight: parentH 
			} = parent;
		
			const horizontalCheck = parentX - (parentW / 2 + childW) * dirX
			
			const leftCheck = vertical ? parentX + (childW / 2) * dirX : horizontalCheck;
			if (leftCheck < 0) {
				horizontalBleed = leftCheck;
			}
			
			const rightCheck = vertical ? parentX + (childW / 2) : horizontalCheck;
			if (rightCheck > innerWidth) {
				horizontalBleed = rightCheck - innerWidth;
			}
			
			const verticalCheck = parentY - (parentH / 2 + childH) * dirY;
			
			const topCheck = vertical ? verticalCheck : parentY - childH / 2;
			if (topCheck < 0) {
				verticalBleed = topCheck;
			}
			
			const bottomCheck = vertical ? verticalCheck : parentY + childH / 2;
			if (bottomCheck > innerHeight) {
				verticalBleed = bottomCheck - innerHeight;
			}
			
			const verticalOffset = 
						`calc(${vertical ? 100 : 50}% + ${verticalBleed * dirY}px)`;
			const horizontalOffset =
						`calc(${vertical ? 50 : 100}% + ${horizontalBleed * dirX}px)`;

			tooltipStyles = generateStyles({
				top: dirY < 0 ? verticalOffset : 'auto',
				right: dirX > 0 ? horizontalOffset : 'auto',
				bottom: dirY > 0 ? verticalOffset : 'auto',
				left: dirX < 0 ? horizontalOffset : 'auto',
				transform: `translate(${vertical ? '-50%, 0' : '0, -50%'})`,
				width: `${width}px`
			})
			
			const offset = `calc(50% + ${vertical ? horizontalBleed : verticalBleed}px)`
			
			triangleStyles = generateStyles({
				top: !vertical ? offset : dirY < 0 ? 0 : 'auto',
				right: dirX > 0 ? 0 : 'auto',
				bottom: dirY > 0 ? 0 : 'auto',
				left: vertical ? offset : dirX < 0 ? 0 : 'auto',
				transform: `translate(${50 * dirX}%, ${50 * dirY}%) rotate(45deg)`
			});
		}
	}
</script>

<div class={`tooltip ${direction}`} bind:this={tooltipRef} style={tooltipStyles}>
	<slot />
	<div class="triangle" bind:this={triangleRef} style={triangleStyles} />
</div>

<style>
	.tooltip {
		position: absolute;
		background: gray;
		color: #fff;
		padding: 20px;
		transition: opacity .15s ease;
	}
	.up,
	.down {
		left: 50%;
		transform: translate(-50%, 0);
	}
	.up {
		bottom: 100%;
	}
	.down {
		top: 100%;
	}
	.left,
	.right {
		top: 50%;
		transform: translate(0, -50%);
	}
	.left {
		right: 100%;
	}
	.right {
		left: 100%;
	}
	.triangle {
		content: '';
		width: 20px;
		height: 20px;
		background: black;
		position: absolute;
	}
	.up .triangle,
	.down .triangle {
		left: 50%;
	}
	.up .triangle {
		bottom: 0;
		transform: translate(-50%, 50%) rotate(45deg);
	}
	.down .triangle {
		top: 0;
		transform: translate(-50%, -50%) rotate(45deg);
	}
	.left .triangle,
	.right .triangle {
		top: 50%;
	}
	.left .triangle {
		right: 0;
		transform: translate(50%, -50%) rotate(45deg);
	}
	.right .triangle {
		left: 0;
		transform: translate(-50%, -50%) rotate(45deg);
	}
</style>