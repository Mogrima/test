<template>
  <v-edit-dialog
    ref="dialog"
    @save="$emit('save', values)"
    @cancel="$emit('cancel')"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <slot></slot>
    <template v-slot:input>
      <v-container class="lighten-5">
    <v-row no-gutters>
      <v-col
        v-for="value in values"
        :key="value.label"
      >
        <v-text-field
        
        v-model="value.v"
          :label="value.label"
          hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
        <v-col>
          <v-btn elevation="3" small @click="cancel">Отменить</v-btn>
          </v-col>
        <v-col>
          <v-btn elevation="3" small @click="save">Сохранить</v-btn>
        </v-col>
      </v-row>
  </v-container>
        

    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  name: "TableDialog",
  props: ["values"],
  methods: {
    save() {
      this.$emit('save', this.values)
      this.cancel()
    },
    cancel() {
      this.$refs.dialog.cancel()
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 260px;
}
</style>