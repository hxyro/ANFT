import axios from 'axios'
export function Nft({ imageSrc, user, priceref, name, id, index, state }) {
    const bid = async () => {
        axios
            .post('http://localhost:8080/bid', {
                price: priceref.current[index].price,
                id,
            })
            .then(({ data }) => {
                const { success } = data
                if (success) {
                    console.log(priceref.current[index].price)
                }
            })
            .catch((error) => console.log(error))
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
                <button
                    className="cbtn"
                    onClick={() => {
                        priceref.current[index].price += 10
                        bid()
                    }}
                >
                    bid
                </button>
                <p>{priceref.current[index].price}$</p>
            </div>
        </div>
    )
}
