<script lang="ts">
	import sparkles from './sparkles.gif'
	import contact from './contact.gif'
	import links from './links.gif'
	import projects from '../_projects.json'

	import type { BlogPostPreview } from '../blog.json/+server.js'

	export let data
	export let posts: BlogPostPreview[] = data.posts
</script>

<table id="main-table">
	<tr>
		<td>
			<div id="welcome">
				<table>
					<tr>
						<td><img src={sparkles} alt="sparkles" /></td>
						<td>
							<h1>welcome to mat's site!!!</h1>
						</td>
						<td><img src={sparkles} alt="sparkles" /></td>
					</tr>
				</table>
				<div>
					hi, thanks for stopping by. i am mat, i make things on the internet.
					<br />
					this is my personal web site on the world wide web.
				</div>
				<br />
				<div>
					<a href="//matdoes.dev/"><img src="/buttons/matdoesdev.png" alt="matdoesdev" /></a>
					<a href="//adryd.com/"><img src="/buttons/adryd.png" alt="adryd" /></a>
					<a href="//notnite.com/"><img src="/buttons/notnite.gif" alt="notnite" /></a>
					<a href="//shrecked.dev/"><img src="/buttons/shwecky.png" alt="shrecknt" /></a>
					<a href="//goldenstack.github.io/"
						><img src="/buttons/goldenstack.png" alt="goldenstack" /></a
					>
					<a href="//www.kibty.town/"><img src="/buttons/kibtytown.gif" alt="kibty.town" /></a>
					<a href="//honbra.com/"><img src="/buttons/honbra.png" alt="honbra" /></a>
					<a href="//archlinux.org/"><img src="/buttons/archbtw.png" alt="archbtw" /></a>
					<a href="//www.mozilla.org/en-US/firefox/new/"
						><img src="/buttons/getfirefox.gif" alt="getfirefox" /></a
					>
					<a href="//github.com/mat-1"><img src="/buttons/github.gif" alt="github" /></a>
					<a href="//ko-fi.com/matdoesdev"><img src="/buttons/kofi.gif" alt="kofi" /></a>
					<a href="//code.visualstudio.com/"><img src="/buttons/vscode.gif" alt="vscode" /></a>
					<a href="//www.hetzner.com/"><img src="/buttons/hetzner.gif" alt="hetzner" /></a>
					<a href="//www.mozilla.org/en-US/firefox/new/"
						><img src="/buttons/anythingbutchrome.gif" alt="anythingbutchrome" /></a
					>
					<a href="//www.torproject.org/"><img src="/buttons/tor.gif" alt="tor" /></a>
					<a href="//ublockorigin.com/"
						><img src="/buttons/ublockorigin.png" alt="ublock origin" /></a
					>
					<a href="//www.eff.org/"
						><img src="/buttons/fightforprivacy.gif" alt="fight for privacy" /></a
					>
					<a
						href="//ftp.nluug.nl/netscape/netscape9/en-US/9.0/windows/win32/netscape-navigator-9.0.0.6.exe"
						><img src="/buttons/netscape.gif" alt="netscape" /></a
					>
				</div>
			</div>
		</td>
		<td>
			<div class="sidebar-list">
				<h2>BLOG POSTS</h2>
				{#each posts as post}
					<div><a href={post.slug}>{post.title}</a></div>
				{/each}
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<table id="sections">
				<tr>
					<td class="section contact">
						<div><img src={contact} alt="contact" /></div>
						<p>
							my preferred method of contact is <a href="https://matrix.to/#/@mat:matdoes.dev"
								>matrix</a
							>, but you can also email me (i have a catch-all on this domain). i'm also on
							<a href="https://f.matdoes.dev/mat">the fediverse</a>.
						</p>
					</td>
					<td class="section links">
						<div><img src={links} alt="links" /></div>
						<p>
							i have a github at <a href="https://github.com/mat-1">github.com/mat-1</a>, and you
							can give me money through ko-fi at
							<a href="https://ko-fi.com/matdoesdev">ko-fi.com/matdoesdev</a>.
						</p>
					</td>
				</tr>
			</table>
		</td>
		<td>
			<div class="sidebar-list">
				<h2>PROJECTS</h2>
				{#each projects as project}
					<div><a href={project.href}>{project.name}</a></div>
				{/each}
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<img src="//counter.matdoes.dev" alt="visitor counter" id="counter" />
		</td>
	</tr>
</table>

<style>
	.sidebar-list {
		text-align: right;
		height: 400px;
		overflow-y: scroll;
		display: table;
	}
	.sidebar-list h2 {
		margin: 0;
		display: inline-block;
		height: initial;
	}

	#main-table {
		width: 100%;
	}

	#welcome {
		margin: 0 auto;
		max-width: 600px;
	}

	#sections {
		width: 100%;
	}
	.section p {
		max-width: 300px;
	}
	.contact {
		padding-right: 10px;
	}

	#counter {
		margin: 0 auto;
		display: block;
	}
</style>
