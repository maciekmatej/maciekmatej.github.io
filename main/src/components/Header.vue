<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white"
            href="#" @click.prevent="toggleAuthModal">
                {{ loginState }}
            </a>
          </li>
          <template v-else>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="logout">
                {{ loginState }}
            </a>
          </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppHeader',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    // toggleAuthModal() {
    //   this.$store.commit('toggleAuthModal');
    //   console.log(this.$store.state.authModalShow);
    // },
    async logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    ...mapState(['userLoggedIn']),
    loginState() {
      if (this.userLoggedIn) {
        return 'Logout';
      }
      return 'Login / Register';
    },
  },
};
</script>

<style>

</style>
