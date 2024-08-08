import { ContractAddress, OutputContainer } from "components"
import { CreateOffer } from "./components/createOffer/CreateOffer"

export const EscrowInteraction = () => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex felx-col gap-2'>
                <div className='flex justify-start gap-2'>
                    <CreateOffer />
                </div>
            </div>
            <div className='flex felx-col gap-2'>
                <div className='flex felx-col gap-2'>
                    <h5 className='font-bold text-xl mb-2 text-neutral-950'>
                        Created Offers
                    </h5>
                </div>
                <div className='flex justify-start gap-2'>
                    TBA
                </div>
            </div>
            <div className='flex felx-col gap-2'>
                <div className='flex felx-col gap-2'>
                    <h5 className='font-bold text-xl mb-2 text-neutral-950'>
                        My Offers
                    </h5>
                </div>
                <div className='flex justify-start gap-2'>
                    TBA
                </div>
            </div>
            <OutputContainer>
                <ContractAddress />
            </OutputContainer>
        </div>
    )

}