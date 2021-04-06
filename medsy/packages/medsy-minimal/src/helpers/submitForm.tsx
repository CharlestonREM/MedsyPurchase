export const onSubmit = async (values, setSubmitting) => {
    alert('clicked submit')
    // console.log('submit button was clicked.VALUES:', values);
    //employ javascripts global fetch method for easy,logical way to fetch resources asynchronously across the network
    //employ the await operator to wait for the returned promise; the await operator is used inside the async function started above because this is the only context the operator can be used. the syntax is [rv] await expression; so it awaits an expression that is a Promise or any value to wait for. the rv is the returned value;  it returns the fulfilled value of the promise, or the value itself if its not the promise
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