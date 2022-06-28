export function Nft({ imageSrc, user, price, name, id }) {
    const bid = async () => {
        const response = await fetch('http://localhost:8080/bid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: price + 10,
            }),
        }).then(async (res) => await res.json())
        console.log(response)
    }
    return (
        <div className="nftContainer">
            <div className="box">
                <img src={imageSrc} alt="" />
            </div>
            <div className="name">
                <p>{name}</p>
            </div>
            <div className="user">
                <p>Owner: {user}</p>
            </div>
            <div className="price">
                <button className="cbtn" onClick={bid}>
                    bid
                </button>
                <p>{price}$</p>
            </div>
        </div>
    )
}
