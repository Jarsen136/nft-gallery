<template>
  <tippy
    :append-to="body"
    placement="bottom"
    :class="[
      'hidden md:inline-block align-top overflow-hidden text-ellipsis whitespace-nowrap text-k-grey hover:text-text-color',
      className,
    ]"
    :delay="[showDelay, hideDelay]"
    data-testid="identity"
    @show="triggered = true"
  >
    <slot name="content" />

    <template #content>
      <div class="min-h-[12.5rem] bg-background-color">
        <CollectionDetailsPopoverContent
          v-if="triggered"
          :nft="nft"
        />
      </div>
    </template>
  </tippy>

  <nuxt-link
    :to="`/${urlPrefix}/collection/${collection?.id}`"
    class="has-text-link inline-block md:hidden"
  >
    {{ collection?.name || collection?.id }}
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { CarouselNFT } from '../base/types'
import type { Collection } from '../unique/types'
import CollectionDetailsPopoverContent from './CollectionDetailsPopoverContent.vue'

const body = ref(document.body)
const triggered = ref(false)
const { urlPrefix } = usePrefix()

const props = withDefaults(
  defineProps<{
    collection?: Collection
    nft?: CarouselNFT
    showDelay?: number
    hideDelay?: number
    className?: string
  }>(),
  {
    showDelay: 0,
    hideDelay: 0,
    className: '',
    nft: undefined,
    collection: undefined,
  },
)

const nft = computed(
  () =>
    props.nft || {
      collection: props.collection,
    },
)
</script>
