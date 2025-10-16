<script lang="ts">
	let { lang: selectedLang, translations: translationsWord = 'Translations' } = $props()

	const translations = {
		en: 'English',
		ru: 'Russian / Русский',
		it: 'Italian / Italiano',
		es: 'Spanish / Español',
	}
</script>

<div class="language-select">
	{translationsWord}:
	{#each Object.entries(translations) as [lang, name], index}
		{#if index > 0}
			&nbsp;|&nbsp;
		{/if}{#if lang === selectedLang}
			<strong>{name}</strong>
		{:else}
			<a href={lang === 'en' ? '/matscan' : `/matscan/${lang}`}>{name}</a>
		{/if}
	{/each}
</div>

<style>
	.language-select {
		margin: 0 0 0.5rem 1rem;
		font-size: 0.9rem;
		font-style: italic;
	}
</style>
