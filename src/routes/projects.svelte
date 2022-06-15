<script lang="ts" context="module">
	export const prerender = true
</script>

<script lang="ts">
	import BackAnchor from '$lib/BackAnchor.svelte'
	import Project from '$lib/Project.svelte'
</script>

<div>
	<nav>
		<BackAnchor href="/" />
	</nav>
	<h1>Projects</h1>
	<Project name="matdoesdev" href="https://matdoes.dev" rust>My portfolio.</Project>
	<Project name="i.matdoes.dev" href="https://i.matdoes.dev" rust>A simple image host.</Project>
	<Project name="Web Utils" href="https://u.matdoes.dev" svelte typescript>
		Utilities for software developers.
	</Project>
	<Project name="mat's rss reader" href="https://rss.matdoes.dev" svelte typescript>
		Simple RSS reader.
	</Project>
	<Project name="Metasearch" href="https://s.matdoes.dev" typescript>
		Simple metasearch engine.
	</Project>
	<Project name="SnooSlash" href="https://www.youtube.com/channel/UCz5bLto2bC9fSC5N429WDnw" python>
		Reddit TTS video generator.
	</Project>
	<Project name="DreamSMP Tracker" python>
		Tracks when DreamSMP members play and livestream.
	</Project>
	<Project name="Wynn Lea Moe" href="https://wynnleamoe.matdoes.dev" javascript>
		Parody of sky.lea.moe that shows Wynncraft stats instead of SkyBlock stats.
	</Project>
	<Project name="Forum Sweats" source="https://github.com/mat-1/forum-sweats/" python>
		A Discord bot with many useful and unique features.
	</Project>
	<Project name="Minecraft Assets" href="https://mcassets.matdoes.dev" python>
		A user-friendly interface for the assets of all Minecraft versions.
	</Project>
	<Project name="SkyBlock Stats" href="https://skyblock.matdoes.dev/" typescript svelte>
		Check your Hypixel SkyBlock stats, see leaderboards, mayors, auction prices, and way more.
	</Project>
	<Project name="Super Duper Simple Pinger" href="https://ping.matdoes.dev/" python>
		Send an HTTP request to your repls every few minutes to keep them alive.
	</Project>
	<Project name="The Stonk Exchange" python>
		A stock market simulator with a twist. Instead of investing in real companies, you invest in
		your fellow server members.
	</Project>
	<Project
		name="Domain Hack Finder"
		href="https://replit.com/talk/share/Domain-Hack-Finder/15778"
		source="https://replit.com/@mat1/domain-hack-finder"
		python
	>
		Find domain hacks for any word or phrase.
	</Project>
	<Project
		name="Colors"
		href="https://colors.matdoes.dev/"
		source="https://replit.com/@mat1/colors"
		python
	>
		Find the best colors.
	</Project>
	<Project
		name="HTTP Lookup"
		href="https://http.matdoes.dev/"
		source="https://replit.com/@mat1/http-statuses"
	>
		Look up HTTP status codes.
	</Project>
	<Project
		name="4bit"
		href="https://web.archive.org/web/20190502100718/https://4bitbot.tk/"
		archived
		python
	>
		Fun utility bot for Discord.
	</Project>
	<Project name="Repl Talk API" href="https://pypi.org/project/repltalk/" archived python>
		API wrapper for <a href="https://replit.com/community/all">Repl Talk</a>.
	</Project>
	<Project name="Old i.matdoes.dev" source="https://github.com/mat-1/i.matdoes.dev" python>
		A simple image host.
	</Project>
	<Project
		name="Repl Talk Bot"
		href="https://replit.com/talk/share/Repl-Talk-Discord-Bot/5599"
		archived
		python
	>
		Discord bot that automatically sends posts from Repl Talk into the #repl-talk channel in the
		Replit Discord.
	</Project>
	<Project name="Old matdoesdev" python>My portfolio.</Project>
	<Project name="Replit Dark Theme" href="https://darktheme.matdoes.dev/themes" python>
		A customizable dark theme for Replit.
	</Project>
	<Project name="Hytale Discord Webhook" href="https://hytale.matdoes.dev" python>
		Automatically send Hytale blog posts to your Discord server with only one click.
	</Project>
</div>
