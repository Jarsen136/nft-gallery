import type { NFTWithMetadata } from '@/composables/useNft'
import { SwapStep } from '@/components/swap/types'

export default (nft: NFTWithMetadata) => {
  const route = useRoute()
  const swapStore = useAtomicSwapStore()
  const { swap, step, stepItems } = storeToRefs(swapStore)

  const routeName = computed(() => route.name?.toString() as string)

  const showAtomicSwapAction = computed(() => ATOMIC_SWAP_PAGES.includes(routeName.value) && step.value !== SwapStep.REVIEW)

  const isItemSelected = computed(() => {
    return showAtomicSwapAction.value
      ? [...swap.value.desired, ...swap.value.offered].flat().some(item => item.id === nft.id)
      : false
  })

  const onAtomicSwapSelect = () => {
    if (isItemSelected.value) {
      swapStore.removeStepItem(nft.id)
    }
    else {
      swapStore.updateStepItems([
        ...stepItems.value,
        {
          id: nft.id,
          collectionId: nft.collection.id,
          sn: nft.sn,
          name: nft.name,
          meta: nft.meta,
        },
      ])
    }
  }

  return {
    onAtomicSwapSelect,
    showAtomicSwapAction,
    isItemSelected,
  }
}
