<script lang="ts">
	let { lang: selectedLang, translations: translationsWord = 'Translations' } = $props()

	const translations = {
		en: 'English',
		ru: 'Russian / Русский',
		it: 'Italian / Italiano',
		es: 'Spanish / Español',
		bg: 'Bulgarian / български',
		pl: 'Polish / Polski',
		fr: 'French / Français',
		de: 'German / Deutsch',
		cn: 'Chinese / 中文',
		id: 'Indonesian / Indonesia',
		cz: 'Czech / Český',
		rs: 'Serbian / Српски',
	}
</script>

<div class="language-select">
	<span class="language-globe-icon">🌐</span>
	{translationsWord}:
	{#each Object.entries(translations) as [lang, name], index}
		{#if index > 0}
			&nbsp;|&nbsp;
		{/if}{#if lang === selectedLang}
			<strong class="language-option">{name}</strong>
		{:else}
			<a class="language-option" href={lang === 'en' ? '/matscan' : `/matscan/${lang}`}>{name}</a>
		{/if}
	{/each}
</div>

<style>
	.language-select {
		margin: 0 0 0.5rem 1rem;
		font-style: italic;
	}
	.language-option {
		white-space: nowrap;
	}
	.language-globe-icon {
		font-style: normal;
	}
</style>
