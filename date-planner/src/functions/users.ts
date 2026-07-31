 // Function to fetch the username based on the user ID
  export const getUsername = async (userId: string) => {
    const response = await fetch(`/api/user/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const userData = await response.json();

    return userData.name;
  }