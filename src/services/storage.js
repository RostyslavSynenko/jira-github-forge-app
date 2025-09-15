import kvs from '@forge/kvs';

export const getStorageData = async (key) => {
  try {
    const value = await kvs.getSecret(key);

    return {
      success: true,
      data: value,
    };
  } catch (error) {
    console.error({ error }, 'Failed to get data from storage');

    return {
      success: false,
    };
  }
};

export const setStorageData = async (key, value) => {
  try {
    await kvs.set(key, value);

    return {
      success: true,
    };
  } catch (error) {
    console.error({ error }, 'Failed to set data in storage');

    return {
      success: false,
    };
  }
};

export const deleteStorageData = async (key) => {
  try {
    await kvs.delete(key);

    return {
      success: true,
    };
  } catch (error) {
    console.error({ error }, 'Failed to delete data from storage');

    return {
      success: false,
    };
  }
};
