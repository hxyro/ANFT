import { Component } from 'react'
import axios from 'axios'

export class Nft extends Component {
    constructor(props) {
        super(props)
    }

    bid() {
        const { priceref, id, index } = this.props
        axios
            .post('http://ec2-54-189-18-6.us-west-2.compute.amazonaws.com:3000/bid', {
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
    render() {
        const { imageSrc, user, priceref, name, index, log } = this.props
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
                    {log ? (
                        <button
                            className="cbtn"
                            onClick={() => {
                                priceref.current[index].price += 10
                                this.bid()
                                this.forceUpdate()
                            }}
                        >
                            bid
                        </button>
                    ) : null}

                    <p>{priceref.current[index].price}$</p>
                </div>
            </div>
        )
    }
}
