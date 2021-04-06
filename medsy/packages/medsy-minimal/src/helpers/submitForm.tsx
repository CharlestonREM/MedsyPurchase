export const onSubmit = async (values, { setSubmitting }) => {
    const res = await fetch('/api/postData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    // console.log('i am res in postData:')
    // console.log(res);
    if (res.status === 200) {
        //setSuccess(true);

    } else {
        //setError(true);
    }
    // setTimeout(() => {
    //     setSubmitting(false);
    //     alert(JSON.stringify(values, null, 2));
    // }, 500);
}