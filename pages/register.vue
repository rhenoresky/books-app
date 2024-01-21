<script setup>
import { useToast } from 'vue-toast-notification';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const toast = useToast();

const account = reactive({
  email: undefined,
  password: undefined,
});

const addAccount = async () => {
  const { status } = await useFetch('http://localhost:8080/auth/register', {
    method: 'post',
    body: JSON.stringify(account),
  });

  if (status.value === 'success') {
    await navigateTo('/login');
  }
  if (status.value === 'error') {
    toast.error('Gagal membuat akun', {
      position: 'bottom-right',
      timeout: 2000,
    });
  }
};
</script>

<template>
  <section
    class="flex justify-center font-montserrat items-center w-full h-screen"
  >
    <div class="bg-[#7E7474] p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-4 text-center text-[#EEEEEE]">
        Register
      </h1>
      <form @submit.prevent="addAccount">
        <div class="mb-4">
          <label
            for="email"
            class="block text-[#EEEEEE] text-sm font-medium mb-1"
            >Email:</label
          >
          <input
            type="email"
            id="email"
            name="email"
            v-model="account.email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93]"
            required
          />
        </div>

        <div class="mb-4">
          <label
            for="password"
            class="block text-[#EEEEEE] text-sm font-medium mb-1"
            >Password:</label
          >
          <input
            type="text"
            id="password"
            name="password"
            v-model="account.password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93]"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-[#FFDD93] text-[#7E7474] px-4 py-2 rounded-md hover:bg-[#ffdd93e1] focus:outline-none transition"
        >
          Login
        </button>
      </form>
    </div>
  </section>
</template>
