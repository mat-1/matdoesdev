<script lang="ts">
	interface ServerData {
		host: string
		port: number
		description: string
		players: {
			max: number
			online: number
			sample: {
				id: string
				name: string
			}[]
		}
		version: {
			name: string
			protocol: number
		}
		onlineMode: undefined | boolean
	}

	interface Props {
		data: ServerData;
	}

	let { data }: Props = $props();

	let displayIp = data.port !== 25565 ? `${data.host}:${data.port}` : data.host
</script>

<div class="minecraft-server">
	<span class="minecraft-ping">
		<span class="minecraft-playercount">
			{data.players.online}<span class="minecraft-playercount-divider">/</span>{data.players.max}
		</span>
	</span>
	<p class="minecraft-server-name">
		{#if data.onlineMode === false}
			[offline mode]
		{/if}
		{displayIp} ({data.version.name})
	</p>
	<p class="minecraft-server-description">{data.description}</p>
</div>

<style>
	@font-face {
		font-family: Minecraft;
		src: url(/fonts/minecraft.otf);
	}
	.minecraft-server-description {
		position: relative;
		margin: 0;
		top: 0.5em;
		word-spacing: 4px;
		letter-spacing: 0.5px;
		color: #808080;
	}
	.minecraft-server-name {
		position: relative;
		color: #fff;
		margin: 0;
		top: 0.25em;
	}
	.minecraft-server {
		background-image: url(/minecraft-scanning/minecraft-server-background.png);
		height: 5em;
		font-family: Minecraft;
		font-size: 16px;
		font-weight: normal;
		width: 37.5em;
		position: relative;
		padding: 0 0.5em;
	}
	.minecraft-ping {
		position: absolute;
		right: 0;
		padding: 0.5em;
		z-index: 100;
	}
	.minecraft-playercount {
		color: #bebebe;
	}
	.minecraft-playercount-divider {
		color: #3f3f3f;
	}
	@media only screen and (max-width: 720px) {
		.minecraft-server {
			font-size: 2.5vw;
		}
	}
</style>
