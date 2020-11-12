<template>
  <v-card>
    <v-card-title>
      <h1 class="title">Занимаемые должности</h1>
      <v-spacer></v-spacer>
      <v-container class="container">
        <v-row>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по сотруднику"
            single-line
            hide-details
          ></v-text-field>
        </v-row>
        <v-row class="mt-5 justify-space-between align-center">
          <v-col style="margin-left: -9px">
            <v-checkbox
              class="checkbox-firedate"
              v-model="fireDateСheckbox"
              label="Показать уволенных"
              color="green"
            ></v-checkbox>
          </v-col>
          <v-col class="mr-5">
            <v-btn
              style="border-radius: 0px"
              elevation="2"
              small
              color="rgb(165, 214, 167)"
              @click="fireOn"
              :disabled="selectedIsHire"
              >Принять на должность</v-btn
            >
          </v-col>
          <v-col style="margin-right: -34px">
            <v-btn
              style="border-radius: 0px"
              elevation="2"
              small
              color="rgb(165, 214, 167)"
              @click="fireOff"
              :disabled="selectedIsFire"
              >{{ `Снять с должност${isSelectedLength()}` }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :single-select="singleSelect"
      item-key="name"
      show-select
      :headers="headers"
      :items="filtredList"
      :search="search"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.name"
            :class="item.fireDate !== null ? 'fire-date' : ''"
          >
            <td>
              <v-checkbox
                color="green"
                :value="isSelected(item)"
                @change="selectedChange(item, index)"
              ></v-checkbox>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.companyName }}</td>
            <td>{{ item.hireDate }}</td>
            <td>{{ item.fireDate }}</td>
            <td v-if="item.fireDate == null">
              <TableDialog
                :values="[
                  { v: item.salary, label: 'Ставка, руб' },
                  { v: item.fraction, label: 'Ставка, %' },
                ]"
                @save="
                  (newValues) => {
                    item.salary = newValues[0].v;
                    item.fraction = newValues[1].v;
                  }
                "
              >
                {{ `${$price(item.salary)} ₽ (${item.fraction}%)` }}
              </TableDialog>
            </td>
            <td v-else>
              {{ `${$price(item.salary)} ₽ (${item.fraction}%)` }}
            </td>
            <td v-if="item.fireDate == null">
              <TableDialog
                :values="[{ v: item.base, label: 'База' }]"
                @save="
                  (newValues) => {
                    item.base = newValues[0].v;
                  }
                "
              >
                {{ `${$price(item.base)} ₽` }}
              </TableDialog>
            </td>
            <td v-else>
              {{ `${$price(item.base)} ₽` }}
            </td>
            <td v-if="item.fireDate == null">
              <TableDialog
                :values="[{ v: item.advance, label: 'Аванс' }]"
                @save="
                  (newValues) => {
                    item.advance = newValues[0].v;
                  }
                "
              >
                {{ `${$price(item.advance)} ₽` }}
              </TableDialog>
            </td>
            <td v-else>
              {{ `${$price(item.advance)} ₽` }}
            </td>
            <td>
              <v-simple-checkbox
                v-model="item.byHours"
                disabled
              ></v-simple-checkbox>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from "moment";
import TableDialog from "./Table-dialog";
import axios from "axios";

export default {
  name: "Table",
  components: {
    TableDialog,
  },
  props: {
    list: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      globalCheckbox: false,
      fireDateСheckbox: true,
      search: "",
      singleSelect: false,
      selected: [],
      headers: [
        { text: "Сотрудник", value: "name" },
        { text: "Компания", value: "companyName" },
        { text: "Должность", value: "companyName" },
        { text: "Дата приема", value: "hireDate" },
        { text: "Дата увольнения", value: "fireDate" },
        { text: "Ставка", value: "salary" },
        { text: "База", value: "base" },
        { text: "Аванс", value: "advance" },
        { text: "Почасовая", value: "byHours" },
      ],
      directory: [],
      localList: this.list,
    };
  },
  async mounted() {
    try {
      var result = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/",
        data: {
          query: `
          {
    				getOccupations {
            id
            name
            companyName
            positionName
            hireDate
            fireDate
            salary
            fraction
            base
            advance
            byHours
          }
            }
    				`
        },
      })
      this.directory = result.data.data.getOccupations
      console.log(this.directory)
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    isSelected(item) {
      return this.selected.some((someItem) => someItem === item);
    },
    selectedChange(item) {
      if (!item) return;
      let isSelected = this.selected.some((someItem) => someItem === item);
      if (isSelected) {
        let index = this.selected.findIndex((findItem) => findItem === item);
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item);
      }
    },
    isSelectedLength() {
      return this.selected.length < 2 ? "и" : "ей";
    },
    fireOn() {
      this.localList.forEach((item) => {
        let selectedItem = this.selected.find((findItem) => findItem === item);
        if (selectedItem && selectedItem.fireDate !== null) {
          item.fireDate = null;
          item.hireDate = moment().format("DD.M.YYYY");
        }
      });
    },
    fireOff() {
      this.localList.forEach((item) => {
        let selectedItem = this.selected.find((findItem) => findItem === item);
        if (selectedItem && selectedItem.fireDate === null) {
          item.fireDate = moment().format("DD.M.YYYY");
        }
      });
    },
  },
  computed: {
    filtredList() {
      let searchString = this.search;
      return this.directory.filter((worker) => {
        return worker.name.includes(searchString);
      });
    },
    selectedIsFire() {
      return this.selected.every((item) => {
        return item.fireDate !== null;
      });
    },
    selectedIsHire() {
      if (this.selected.length == 0) {
        return false;
      }
      return this.selected.every((item) => {
        return item.fireDate === null;
      });
    },
  },
  watch: {
    fireDateСheckbox: {
      immediate: true,
      handler(v) {
        if (v) {
          this.localList = this.list;
        } else {
          this.localList = this.list.filter((item) => {
            return item.fireDate === null;
          });
        }
      },
    },
  }
};
</script>

<style scoped>
.container {
  width: 600px;
}

.title {
  margin: 0;
  margin-top: -45px;
  font-weight: normal;
}

.col {
  padding: 0;
}

.checkbox-firedate {
  margin-top: 0;
  margin-bottom: -24px;
  padding-top: 0;
}

.fire-date {
  background-color: rgb(255, 138, 128);
}

.fire-date:hover {
  background-color: rgb(255, 138, 128) !important;
}
</style>