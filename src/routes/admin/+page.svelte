<script lang="ts">
import { onMount } from 'svelte';
import { getAllUsers, updateUserField, deleteUserById, deleteUsersByIds } from '$lib/utils/userdb';

let password = '';
let authenticated = false;
let users: any[] = [];
let error = '';
let selectedIds: number[] = [];

async function fetchUsers() {
  users = await getAllUsers();
}

function handleLogin() {
  if (password === 'sednadata') {
    authenticated = true;
    fetchUsers();
    error = '';
  } else {
    error = 'Incorrect password';
  }
}

function exportCSV() {
  if (!users.length) return;
  const header = 'Name,Pain Point,Occupation,Timestamp\n';
  const rows = users.map(u => `"${u.name}","${u.painPoint}","${u.occupation}","${new Date(u.timestamp).toLocaleString()}"`).join('\n');
  const csv = header + rows;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sedna_users.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function toggleSelect(id: number) {
  if (selectedIds.includes(id)) {
    selectedIds = selectedIds.filter(x => x !== id);
  } else {
    selectedIds = [...selectedIds, id];
  }
}

function selectAll() {
  if (selectedIds.length === users.length) {
    selectedIds = [];
  } else {
    selectedIds = users.map(u => u.id);
  }
}

async function deleteSelected() {
  if (selectedIds.length === 0) return;
  if (confirm('Are you sure you want to delete the selected user(s)? This cannot be undone.')) {
    await deleteUsersByIds(selectedIds);
    selectedIds = [];
    await fetchUsers();
  }
}

async function deleteSingle(id: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    await deleteUserById(id);
    selectedIds = selectedIds.filter(x => x !== id);
    await fetchUsers();
  }
}
</script>

<svelte:head>
  <title>Admin - Sedna AI Gameshow</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-sedna-dark-slate-blue p-4">
  {#if !authenticated}
    <div class="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
      <h2 class="text-2xl font-retro-bold text-sedna-orange mb-4">Admin Login</h2>
      <input
        type="password"
        bind:value={password}
        class="sedna-input w-full text-xl mb-4"
        placeholder="Enter admin password..."
        on:keydown={(e) => e.key === 'Enter' && handleLogin()}
      />
      {#if error}
        <div class="text-red-600 mb-2">{error}</div>
      {/if}
      <button class="sedna-btn sedna-btn-accent w-full" on:click={handleLogin}>Login</button>
    </div>
  {:else}
    <div class="bg-white rounded-xl shadow-xl p-8 max-w-3xl w-full">
      <h2 class="text-2xl font-retro-bold text-sedna-orange mb-4">User Data</h2>
      <div class="flex gap-4 mb-4">
        <button class="sedna-btn sedna-btn-accent" on:click={fetchUsers}>Refresh</button>
        <button class="sedna-btn sedna-btn-secondary" on:click={exportCSV}>Export as CSV</button>
      </div>
      {#if users.length === 0}
        <div class="text-sedna-steel-blue-tint">No user data found.</div>
      {:else}
        <div class="mb-4">
          <button class="sedna-btn sedna-btn-secondary" on:click={deleteSelected} disabled={selectedIds.length === 0}>Delete Selected</button>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="border-b-2 p-2"><input type="checkbox" checked={selectedIds.length === users.length && users.length > 0} on:change={selectAll}></th>
              <th class="border-b-2 p-2">Name</th>
              <th class="border-b-2 p-2">Pain Point</th>
              <th class="border-b-2 p-2">Occupation</th>
              <th class="border-b-2 p-2">Timestamp</th>
              <th class="border-b-2 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each users as user}
              <tr>
                <td class="border-b p-2">
                  <input type="checkbox" checked={selectedIds.includes(user.id)} on:change={() => toggleSelect(user.id)}>
                </td>
                <td class="border-b p-2">{user.name}</td>
                <td class="border-b p-2">{user.painPoint}</td>
                <td class="border-b p-2">{user.occupation}</td>
                <td class="border-b p-2">{new Date(user.timestamp).toLocaleString()}</td>
                <td class="border-b p-2">
                  <button class="text-xs text-red-600 underline" on:click={() => deleteSingle(user.id)}>Delete</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  {/if}
</div> 