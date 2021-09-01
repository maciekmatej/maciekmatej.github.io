<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    @submit="register"
    :validation-schema="schema"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded"
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none
          focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded"
      />
      <error-message class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label for="pass" class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          id="pass"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
            transition duration-500 focus:outline-none focus:border-black
            rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label for="confirm_password" class="inline-block mb-2">Confirm Password</label>
      <vee-field
        id="confirm_password"
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded"
        placeholder="Confirm Password"
      />
      <error-message class="text-red-600" name="confirm_password" />
    </div>
    <!-- User Type -->
    <div class="mb-3">
      <label class="inline-block">User type</label>
      <vee-field
      name="user_type"
      as="select"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded">
          <option value="Artist">Artist</option>
          <option value="Listener">Listener</option>
      </vee-field>
      <error-message class="text-red-600" name="user_type" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Argentina">Argentina</option>
      </vee-field>
      <error-message class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded inline-block"
      />
      <label class="inline-block">Accept terms of service</label>
      <error-message class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      :disabled="reg_in_submission"
      :class="toggleSubmitButton"
      class="block w-full text-white py-1.5 px-3 rounded transition"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email|min:3|max:100',
        age: 'required|min_value:18|max_value:105',
        password: 'required|min:3|max:20',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Argentina',
        tos: 'tos',
        user_type: 'user_type',
      },
      userData: {
        country: 'USA',
        user_type: 'Listener',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created',
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'Unexpected error occured. Please, try again';
        return;
      }

      console.log(this.$store.state.userLoggedIn);
      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created';
      this.$store.commit('toggleAuthModal');
      await this.$store.dispatch('succesLog');
      window.location.reload();
    },
  },
  computed: {
    toggleSubmitButton() {
      if (this.reg_in_submission) {
        return 'bg-gray-500';
      }
      return 'hover:bg-purple-700 bg-purple-600';
    },
  },
};
</script>
