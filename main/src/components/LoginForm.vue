<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >{{ login_alert_message }}
  </div>
  <vee-form @submit="login" :validation-schema="loginSchema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 ext-gray-800 border border-gray-300
          transition duration-500 focus:outline-none focus:border-black
          rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
      :class="{
        'bg-purple-600 hover:bg-purple-700': !login_in_submission,
        'bg-gray-500': login_in_submission,
      }"
      class="block w-full text-white py-1.5 px-3 rounded transition"
    >
      Login
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:20',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_message: 'Please wait! Checking the credentials...',

    };
  },
  methods: {
    async login(values) {
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_message = 'Please wait! Checking the credentials...';
      this.login_in_submission = true;
      this.login_show_alert = true;
      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_message = 'Sorry, unexpected error occurred, try again!';
        this.login_alert_variant = 'bg-red-600';
        return;
      }

      this.login_alert_message = 'Success! You logged in!';
      this.login_alert_variant = 'bg-green-600';
      await this.$store.dispatch('succesLog');
      window.location.reload();
    },
  },
};
</script>
