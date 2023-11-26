<script setup>
const { isActive } = defineProps({
  isActive: Boolean,
})
</script>

<template>
  <div>
    <v-card
        v-if="isActive"
        class="modal"
    >
      <v-toolbar
          color="error"
          title="Warning!"
      ></v-toolbar>
      <v-card-text>
        <div class="text-h2 pa-12 text-red-accent-2">Todo title can't be empty!</div>
      </v-card-text>
      <v-card-actions class="close-button text-black justify-sm-center">
        <v-btn
            variant="text"
            @click="$emit('close')"
            class="v-btn--size-small"
        >Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  z-index: 1040;
  backdrop-filter: blur(15px);
  transition: opacity 0.5s ease;
}

</style>