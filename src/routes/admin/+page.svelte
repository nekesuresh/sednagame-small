<script lang="ts">
import { onMount } from 'svelte';
import { getAllUsers, updateUserField, deleteUserById, deleteUsersByIds, updateUserRaffleEntries } from '$lib/utils/userdb';

let password = '';
let authenticated = false;
let users: any[] = [];
let error = '';
let selectedIds: number[] = [];
let winner: any = null;
let currentPage = 1;
const pageSize = 10;
let searchTerm = '';
let editingTitleId: number | null = null;
let editingTitleValue = '';

$: totalPages = Math.ceil(users.length / pageSize);
$: pagedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
  const header = 'Name,Title,Phone,Email,Pain Point,Organization,State,Timestamp,Raffle Entries\n';
  const rows = users.map(u => {
    // Format phone number to prevent Excel from treating it as a number
    const formattedPhone = u.phone ? `="${u.phone}"` : '';
    return `"${u.name}","${u.title || ''}",${formattedPhone},"${u.email}","${u.painPoint}","${u.organization}","${u.state}","${new Date(u.timestamp).toLocaleString()}","${u.raffleEntries || 1}"`;
  }).join('\n');
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

async function updateRaffleEntries(id: number, value: number) {
  await updateUserRaffleEntries(id, value);
  await fetchUsers();
}

function chooseWinner() {
  // Build the raffle pool
  const pool = users.flatMap(u => Array(u.raffleEntries ?? 1).fill(u));
  if (pool.length === 0) {
    winner = null;
    return;
  }
  const idx = Math.floor(Math.random() * pool.length);
  winner = pool[idx];
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
  }
}

function handleSearch() {
  if (!searchTerm.trim()) {
    pagedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    return;
  }
  const term = searchTerm.trim().toLowerCase();
  pagedUsers = users.filter(u =>
    (u.name && u.name.toLowerCase().includes(term)) ||
    (u.title && u.title.toLowerCase().includes(term)) ||
    (u.email && u.email.toLowerCase().includes(term)) ||
    (u.phone && u.phone.toLowerCase().includes(term)) ||
    (u.organization && u.organization.toLowerCase().includes(term)) ||
    (u.state && u.state.toLowerCase().includes(term))
  );
}

async function clearAllUsers() {
  if (confirm('Are you sure you want to delete ALL users? This cannot be undone.')) {
    await deleteUsersByIds(users.map(u => u.id));
    selectedIds = [];
    await fetchUsers();
  }
}

async function startEditTitle(user) {
  editingTitleId = user.id;
  editingTitleValue = user.title || '';
}

async function saveEditTitle(user) {
  if (editingTitleId !== null) {
    await updateUserField(user.id, 'title', editingTitleValue);
    editingTitleId = null;
    editingTitleValue = '';
    await fetchUsers();
  }
}

</script>

<svelte:head>
  <title>Admin - AI or A-Lie</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-sedna-dark-slate-blue p-4">
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
    <div class="bg-white rounded-xl shadow-xl p-8 max-w-5xl w-full flex flex-col items-center">
      <h2 class="text-2xl font-retro-bold text-sedna-orange mb-4">User Data</h2>
      <div class="flex gap-4 mb-4">
        <button class="sedna-btn sedna-btn-accent" on:click={fetchUsers}>Refresh</button>
        <button class="sedna-btn sedna-btn-secondary" on:click={exportCSV}>Export as CSV</button>
        <input type="text" class="sedna-input w-64 text-xl" placeholder="Search users..." bind:value={searchTerm} />
        <button class="sedna-btn sedna-btn-accent" on:click={handleSearch}>Search</button>
      </div>
      {#if users.length === 0}
        <div class="text-sedna-steel-blue-tint">No user data found.</div>
      {:else}
        <div class="mb-4">
          <button class="sedna-btn sedna-btn-secondary" on:click={deleteSelected} disabled={selectedIds.length === 0}>Delete Selected</button>
        </div>
        <div class="overflow-auto w-full" style="max-height: 60vh;">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="border-b-2 p-2"><input type="checkbox" checked={selectedIds.length === users.length && users.length > 0} on:change={selectAll}></th>
              <th class="border-b-2 p-2">Name</th>
              <th class="border-b-2 p-2">Title</th>
              <th class="border-b-2 p-2">Phone</th>
              <th class="border-b-2 p-2">Email</th>
              <th class="border-b-2 p-2">Pain Point</th>
              <th class="border-b-2 p-2">Organization</th>
              <th class="border-b-2 p-2">State</th>
              <th class="border-b-2 p-2">Timestamp</th>
              <th class="border-b-2 p-2">Raffle Entries</th>
              <th class="border-b-2 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each pagedUsers as user}
              <tr>
                <td class="border-b p-2">
                  <input type="checkbox" checked={selectedIds.includes(user.id)} on:change={() => toggleSelect(user.id)}>
                </td>
                <td class="border-b p-2">{user.name}</td>
                <td class="border-b p-2">
                  {#if editingTitleId === user.id}
                    <input
                      class="sedna-input w-32 text-sm"
                      bind:value={editingTitleValue}
                      on:blur={() => saveEditTitle(user)}
                      on:keydown={(e) => { if (e.key === 'Enter') saveEditTitle(user); }}
                      autofocus
                    />
                  {:else}
                    {user.title || '-'}
                    <button class="ml-2 text-xs text-blue-600 underline" on:click={() => startEditTitle(user)}>Edit</button>
                  {/if}
                </td>
                <td class="border-b p-2">{user.phone}</td>
                <td class="border-b p-2">{user.email}</td>
                <td class="border-b p-2">{user.painPoint}</td>
                <td class="border-b p-2">{user.organization}</td>
                <td class="border-b p-2">{user.state}</td>
                <td class="border-b p-2">{new Date(user.timestamp).toLocaleString()}</td>
                <td class="border-b p-2">
                  <input type="number" min="1" class="w-16 border rounded px-2 py-1" value={user.raffleEntries} on:change={e => updateRaffleEntries(user.id, +e.target.value)}>
                </td>
                <td class="border-b p-2">
                  <button class="text-xs text-red-600 underline" on:click={() => deleteSingle(user.id)}>Delete</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        </div>
        <!-- Pagination controls -->
        {#if totalPages > 1}
        <div class="flex justify-center items-center gap-2 mt-4">
          <button class="sedna-btn sedna-btn-secondary px-3 py-1" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          {#each Array(totalPages) as _, i}
            <button class="sedna-btn px-3 py-1 {currentPage === i + 1 ? 'sedna-btn-accent' : 'sedna-btn-secondary'}" on:click={() => goToPage(i + 1)}>{i + 1}</button>
          {/each}
          <button class="sedna-btn sedna-btn-secondary px-3 py-1" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        </div>
        {/if}
        <div class="mt-6 flex flex-col items-center gap-2">
          <button class="sedna-btn sedna-btn-accent" on:click={chooseWinner}>Choose Winner</button>
          {#if winner}
            <div class="mt-2 text-lg font-bold text-sedna-orange">Winner: {winner.name} ({winner.organization})</div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div> 