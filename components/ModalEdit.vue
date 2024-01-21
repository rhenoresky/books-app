<script setup>
const emit = defineEmits(['cancelEdit', 'successEdit', 'errorEdit']);
const props = defineProps({
  id: Number,
  bookValue: Object,
  token: String,
});

async function editBook(id, token, bookValue) {
  const { status } = await useFetch(`http://localhost:8080/books/${id}`, {
    method: 'patch',
    headers: {
      authorization: token,
    },
    body: JSON.stringify(bookValue),
  });

  if (status.value === 'success') {
    emit('successEdit');
  }
  if (status.value === 'error') {
    emit('errorEdit');
  }
}
</script>

<template>
  <section
    class="fixed w-full h-full inset-0 bg-black/75 flex justify-center items-center z-50"
  >
    <form
      @submit.prevent="editBook(id, token, bookValue)"
      class="bg-[#7E7474] rounded p-8 w-fit h-[540px] flex w flex-col justify-center items-center"
    >
      <slot></slot>
      <div class="flex justify-center gap-4 mt-8">
        <button
          class="px-4 py-1 rounded text-slate-50 ring-1 ring-slate-50"
          @click="emit('cancelEdit')"
        >
          Batal
        </button>
        <button
          type="submit"
          class="px-4 py-1 rounded text-slate-50 ring-1 ring-slate-50 bg-[#FFDD93]"
        >
          Kirim
        </button>
      </div>
    </form>
  </section>
</template>
