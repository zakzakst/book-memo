<template>
  <div>
    <sample-auth />
    <sample-items />
    <sample-settings />
  </div>
</template>

<script>
import sampleAuth from '~/components/sample/auth';
import sampleItems from '~/components/sample/items';
import sampleSettings from '~/components/sample/settings';

export default {
  components: {
    sampleAuth,
    sampleItems,
    sampleSettings,
  }
}
</script>
