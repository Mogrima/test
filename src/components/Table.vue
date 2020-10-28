<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            <v-checkbox v-model="globalCheckbox" />
          </th>
          <th class="text-left">Сотрудник</th>
          <th class="text-left">Компания</th>
          <th class="text-left">Должность</th>
          <th class="text-left">Дата приема</th>
          <th class="text-left">Дата увольнения</th>
          <th class="text-left">Ставка</th>
          <th class="text-left">База</th>
          <th class="text-left">Аванс</th>
          <th class="text-left">Почасовая</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.fireDate">
          <td><v-checkbox v-model="globalCheckbox" /></td>
          <td>{{ item.name }}</td>
          <td>{{ item.companyName }}</td>
          <td>{{ item.companyName }}</td>
          <td>{{ item.hireDate }}</td>
          <td>{{ item.fireDate }}</td>
          <td>{{ `${$price(item.salary)} ₽ (${item.fraction}%)` }}</td>
          <td>{{ `${$price(item.base)} ₽` }}</td>
          <td>{{ `${$price(item.advance)} ₽` }}</td>
          <td><v-checkbox v-model="item.byHours" /></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    list: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      globalCheckbox: false
    }
  }
};
</script>