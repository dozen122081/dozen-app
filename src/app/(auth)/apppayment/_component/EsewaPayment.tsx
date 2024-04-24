"use client"
import Image from 'next/image'

const EsewaPayment = () => {
    return (
        <aside className='flex flex-col w-[24rem] gap-4 justify-center items-center rounded-lg p-10 h-[32rem] border'>
            <h2 className='text-xl font-bold'>NPR. 150</h2>
            <div>
                <Image
                    src="/esewa/fikshunEsewa.jpg"
                    alt="esewa qr image"
                    height={270}
                    width={197}
                    className="object-contain rounded-xl"
                />
            </div>
            <div className='max-w-[22rem] rounded-sm text-slate-800 bg-yellow-100 p-2'>
                <p className='text-xs font-bold'>Please send your username and email in remarks while paying with esewa to validate your order. or call us at: 9741660035</p>
            </div>
        </aside>
    )
}

export default EsewaPayment