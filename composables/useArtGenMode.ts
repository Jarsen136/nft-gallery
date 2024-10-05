const enabledOnPages = [
  'prefix-explore-items', // explore items page
  'prefix-explore-collectibles', // explore collections page
]

const enabledPrefix = ['ahp', 'base', 'mnt']

export default function () {
  const route = useRoute()
  const { urlPrefix } = usePrefix()
  const artGenModeFeatureEnabled = computed(() => isArtGenDomain && enabledPrefix.includes(urlPrefix.value) && enabledOnPages.includes(route.name as string ?? ''))
  return {
    artGenModeEnabled: computed(() =>
      artGenModeFeatureEnabled.value && route.query.gen_art?.toString() === 'true',
    ),
    artGenModeFeatureEnabled,
  }
}
