export const downloadURLToBas64 = async (publicUrl: string) => {
  let photoUrl = null;
  const response = await fetch(publicUrl);
  const contentType = response.headers.get('content-type');
  const data = await response.arrayBuffer()
  const base64String = `data:${contentType};base64,${Buffer.from(
    data,
  ).toString('base64')}`;
  console.log(base64String);
};
