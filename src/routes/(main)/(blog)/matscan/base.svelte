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
	}
</script>

<div class="language-select">
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
		font-size: 0.9rem;
		font-style: italic;
	}
	.language-option {
		white-space: nowrap;
	}
</style>
