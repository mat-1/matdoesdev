<script lang="ts">
	import sparkles from './sparkles.gif'
	import contact from './contact.gif'
	import links from './links.gif'
	import projects from '../_projects.json'

	import matdoesdev from './buttons/matdoesdev.png?format=gif'
	import adryd from './buttons/adryd.png?format=gif'
	import notnite from './buttons/notnite.gif'
	import shrecknt from './buttons/shwecky.png?format=gif'
	import goldenstack from './buttons/goldenstack.png?format=gif'
	import kibtytown from './buttons/kibtytown.gif'
	import honbra from './buttons/honbra.png?format=gif'

	import archbtw from './buttons/archbtw.png?format=gif'
	import getFirefox from './buttons/getfirefox.gif'
	import github from './buttons/github.gif'
	import kofi from './buttons/kofi.gif'
	import vscode from './buttons/vscode.gif'
	import hetzner from './buttons/hetzner.gif'
	import anythingbutchrome from './buttons/anythingbutchrome.gif'
	import tor from './buttons/tor.gif'
	import ublockorigin from './buttons/ublockorigin.png?format=gif'
	import fightforprivacy from './buttons/fightforprivacy.gif'
	import netscape from './buttons/netscape.gif'

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
					<a href="https://matdoes.dev/"><img src={matdoesdev} alt="matdoesdev" /></a>
					<a href="https://adryd.com/"><img src={adryd} alt="adryd" /></a>
					<a href="https://notnite.com/"><img src={notnite} alt="notnite" /></a>
					<a href="https://shrecked.dev/"><img src={shrecknt} alt="shrecknt" /></a>
					<a href="https://goldenstack.github.io/"><img src={goldenstack} alt="goldenstack" /></a>
					<a href="https://www.kibty.town/"><img src={kibtytown} alt="kibty.town" /></a>
					<a href="https://honbra.com/"><img src={honbra} alt="honbra" /></a>
					<a href="https://archlinux.org/"><img src={archbtw} alt="archbtw" /></a>
					<a href="https://www.mozilla.org/en-US/firefox/new/"
						><img src={getFirefox} alt="getFirefox" /></a
					>
					<a href="https://github.com/mat-1"><img src={github} alt="github" /></a>
					<a href="https://ko-fi.com/matdoesdev"><img src={kofi} alt="kofi" /></a>
					<a href="https://code.visualstudio.com/"><img src={vscode} alt="vscode" /></a>
					<a href="https://www.hetzner.com/"><img src={hetzner} alt="hetzner" /></a>
					<a href="https://www.mozilla.org/en-US/firefox/new/"
						><img src={anythingbutchrome} alt="anythingbutchrome" /></a
					>
					<a href="https://www.torproject.org/"><img src={tor} alt="tor" /></a>
					<a href="https://ublockorigin.com/"><img src={ublockorigin} alt="ublock origin" /></a>
					<a href="https://www.eff.org/"><img src={fightforprivacy} alt="fight for privacy" /></a>
					<a
						href="https://ftp.nluug.nl/netscape/netscape9/en-US/9.0/windows/win32/netscape-navigator-9.0.0.6.exe"
						><img src={netscape} alt="netscape" /></a
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
			<img src="https://counter.matdoes.dev" alt="visitor counter" id="counter" />
		</td>
	</tr>
</table>

<style>
	.sidebar-list {
		text-align: right;
		height: 400px;
		overflow-y: scroll;
	}
	.sidebar-list h2 {
		margin: 0;
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
