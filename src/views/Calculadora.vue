<template>
  <section>
    <div class="container">
      <ValidationObserver ref="form" v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <section class="">
            <div class="columns is-centered">
              <div class="column is-half has-text-centered">
                <b-field
                  label="Ingrese su capacidad de pago mensual:"
                  class="m-2"
                >
                  <BInputWithValidation
                    rules="required"
                    type="numeric"
                    size="is-medium"
                    :value="value"
                    v-cleave="masks.numeral"
                    placeholder="$2,500.50"
                    @input.native="onInput"
                  />
                </b-field>
              </div>
            </div>
          </section>
          <section class="section">
            <div class="columns is-centered">
              <div class="column has-text-centered">
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
                    <BInputWithValidation
                      rules="required"
                      type="text"
                      placeholder="Coppel"
                      v-model="debt.concept"
                    />
                  </b-field>
                  <b-field
                    class="m-2"
                    label="Cantidad"
                    :label-position="labelPosition"
                  >
                    <BInputWithValidation
                      rules="required|positive"
                      type="numeric"
                      placeholder="$10,000.00"
                      v-model="debt.quantity"
                    />
                  </b-field>
                  <b-field
                    class="m-2"
                    label="Interes"
                    :label-position="labelPosition"
                  >
                    <BInputWithValidation
                      rules="required|positive"
                      type="numeric"
                      placeholder="22%"
                      v-model="debt.interest_rate"
                    />
                  </b-field>
                  <b-field
                    class="m-2"
                    label="Pago minimo"
                    :label-position="labelPosition"
                  >
                    <BInputWithValidation
                      rules="required|positive"
                      type="numeric"
                      placeholder="$1200.50"
                      v-model="debt.minimum_payment"
                    />
                  </b-field>
                  <b-field class="m-2">
                    <button
                      class="button is-success"
                      type="submit"
                      :disabled="invalid"
                    >
                      Agregar
                    </button>
                  </b-field>
                </b-field>
              </div>
            </div>
          </section>
        </form>
      </ValidationObserver>
      <div class="columns">
        <div class="column is-full">
          <b-table :data="data">
            <b-table-column field="concept" label="Concepto" v-slot="props">
              {{ props.row.concept }}
            </b-table-column>
            <b-table-column
              field="quantity"
              label="Cantidad"
              numeric
              sortable
              v-slot="props"
            >
              {{ props.row.quantity }}
            </b-table-column>
            <b-table-column
              field="interest_rate"
              label="Intereses"
              numeric
              v-slot="props"
            >
              {{ props.row.interest_rate }}
            </b-table-column>
            <b-table-column
              field="time_paid"
              label="Tiempo"
              numeric
              v-slot="props"
            >
              {{ props.row.time_paid }}
            </b-table-column>
            <b-table-column custom-key="actions" label="Actions" v-slot="props">
              <button
                class="button is-small is-danger"
                @click="delete(props.row)"
              >
                <b-icon icon="delete" size="is-small"></b-icon>
              </button>
            </b-table-column>
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cleave from "cleave.js";
import { ValidationObserver } from "vee-validate";
import BInputWithValidation from "../components/inputs/BInputWithValidation";

const cleave = {
  name: "cleave",
  bind(el, binding) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  },
};

export default {
  directives: { cleave },
  components: {
    ValidationObserver,
    BInputWithValidation,
  },
  data() {
    return {
      masks: {
        creditCard: { creditCard: true },
        numeral: {
          numeral: true,
          numeralThousandsGroupStyle: "thousand",
          prefix: "$ ",
        },
        custom: {
          delimiters: [".", ".", "-"],
          blocks: [3, 3, 3, 2],
          numericOnly: true,
        },
      },
      labelPosition: "on-border",
      isDisabled: true,
      monthly: null,
      value: null,
      debt: {
        concept: null,
        quantity: null,
        interest_rate: null,
        minimum_payment: null,
      },
      data: [],
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
    onSubmit() {
      this.data.push({ ...this.debt });
      this.debt.concept = "";
      this.debt.quantity = "";
      this.debt.interest_rate = "";
      this.debt.minimum_payment = "";

      this.$nextTick(() => {
        this.$refs.form.reset();
      });
      localStorage.setItem("data", JSON.stringify(this.data));
    },
    onInput(event) {
      this.monthly = event.target._vCleave.getRawValue();
      this.value = event.target._vCleave.getFormattedValue();
    },
  },
  created() {
    document.title = "Calculadora bola de nieve";
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem("data"));
  },
};
</script>
