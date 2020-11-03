<template>
  <v-app>
    <v-main>
          <!-- <v-row>
           
            
          </v-row> -->
      <Table :list="workersList" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "@/components/Table";

export default {
  name: "App",

  components: {
    Table,
  },

  data: () => ({
    fireDateСheckbox: true,
  }),
  computed: {
    ...mapState("workers", {
      workersList: (state) => state.list,
    }),
  },
  methods: {
    ...mapActions("workers", ["addWorkers"]),
  },
  created() {
    this.addWorkers();
  },
};
</script>
