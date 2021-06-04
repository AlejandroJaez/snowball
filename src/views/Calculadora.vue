<template>
  <section>
    <div class="container">
      <section class="">
        <div class="columns is-centered">
          <div class="column is-half has-text-centered">
            <b-field label="Ingrese su capacidad de pago mensual:" class="m-2">
              <b-input required placeholder="2,500" size="is-medium"></b-input>
            </b-field>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <form ref="form" @submit.prevent="queueDebt">
              <b-field
                label="Agregue sus deudas una por una:"
                grouped
                group-multiline
                position="is-centered"
              >
                <b-field
                  class="m-2"
                  label="Concepto"
                  :label-position="labelPosition"
                >
                  <b-input
                    v-model="debt.concept"
                    required
                    placeholder="Coppel"
                  ></b-input>
                </b-field>
                <b-field
                  class="m-2"
                  label="Cantidad"
                  :label-position="labelPosition"
                >
                  <b-input
                    v-model="debt.quantity"
                    required
                    placeholder="12313"
                  ></b-input>
                </b-field>
                <b-field
                  class="m-2"
                  label="Interes"
                  :label-position="labelPosition"
                >
                  <b-input
                    suffix="%"
                    v-model="debt.interest_rate"
                    required
                    placeholder="16%"
                  ></b-input>
                </b-field>
                <b-field
                  class="m-2"
                  label="Pago minimo"
                  :label-position="labelPosition"
                >
                  <b-input
                    v-model="debt.minimum_payment"
                    required
                    placeholder="100"
                  ></b-input>
                </b-field>
                <b-button
                  label="Agregar"
                  type="is-info"
                  class="field m-2"
                  :disabled="isDisabled"
                  @click.prevent="queueDebt"
                />
              </b-field>
            </form>
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <b-table :data="data" :columns="columns"></b-table>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "on-border",
      isDisabled: true,
      debt: {
        concept: null,
        quantity: null,
        interest_rate: null,
        minimum_payment: null,
      },
      data: [
        {
          concept: "Coppel",
          quantity: 2051.01,
          interest_rate: "2016-10-15 13:43:27",

          minimum_payment: null,
          time_paid: "Male",
        },
        {
          concept: "Liverpool",
          quantity: 8016.02,
          interest_rate: "2016-12-15 06:00:53",

          minimum_payment: null,
          time_paid: "Male",
        },
        {
          concept: "Bancomer",
          quantity: 8300.03,
          interest_rate: "2016-04-26 06:26:28",
          minimum_payment: null,
          time_paid: "Female",
        },
      ],
      columns: [
        {
          field: "concept",
          label: "Concepto",
        },
        {
          field: "quantity",
          label: "Deuda original",
          numeric: true,
        },
        {
          field: "interest_rate",
          label: "Intereses",
          centered: true,
          numeric: true,
        },
        {
          field: "time_paid",
          label: "Meses en pagar",
        },
      ],
    };
  },
  methods: {
    queueDebt() {
      if (this.isDisabled) return;
      this.data.push({ ...this.debt });
      this.debt.concept = null;
      this.debt.quantity = null;
      this.debt.interest_rate = null;
      this.debt.minimum_payment = null;
      localStorage.setItem("data", JSON.stringify(this.data));
      const valid = this.$refs.form.checkValidity();
      this.isDisabled = !valid;
      console.log(this.isDisabled);
    },
  },
  created() {
    document.title = "Calculadora bola de nieve";
    this.$multiwatch(
      [
        "debt.concept",
        "debt.quantity",
        "debt.interest_rate",
        "debt.minimum_payment",
      ],
      function () {
        const valid = this.$refs.form.checkValidity();
        console.log(valid)
        this.isDisabled = !valid;
      }
    );
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem("data"));
  },
};
</script>
