"use client";

function AdminPage() {
  async function handleCreateUser() {
    const res = await fetch(`http://localhost:5000/admin/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "three@test.com",
        password: "@Md12345",
        name: "Three Test",
        role: "user",
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      AdminPage
      <section>
        <button onClick={handleCreateUser}>Create User</button>
      </section>
    </>
  );
}

export default AdminPage;
