'use client';
import { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { CATEGORIES } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

function RentModal() {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const category = watch('category');
	const location = watch('location');
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false,
			}),
		[location]
	);
	const rentModal = useRentModal();

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};
	const [step, setStep] = useState(STEPS.CATEGORY);

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};
	const handleChangeSelectValue = (value: CountrySelectValue) => {
		setCustomValue('location', value);
	};

	const actionLabel = useMemo(() => {
		return step === STEPS.PRICE ? 'Create' : 'Next';
	}, [step]);

	const secondaryLabel = useMemo(() => {
		return step === STEPS.CATEGORY ? undefined : 'Back';
	}, [step]);

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading title='Which of these best describes your place?' subtitle='Pick a category' />
			<div
				className='
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            '>
				{CATEGORIES.flatMap((item) => (
					<div key={item.label} className='col-span-1'>
						<CategoryInput
							onClick={(category) => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading title='Where is your place located?' subtitle='Help guests find you!' />
				<CountrySelect onChange={handleChangeSelectValue} value={location} />
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Share some basics about your place'
					subtitle='What amenities do you have?'
				/>
				<Counter
					title='Guests'
					subtitle='How many guests do you allow?'
					value={guestCount}
					onChange={(value) => setCustomValue('guestCount', value)}
				/>
				<hr />
				<Counter
					title='Rooms'
					subtitle='How many rooms do you have?'
					value={roomCount}
					onChange={(value) => setCustomValue('roomCount', value)}
				/>
				<hr />
				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms do you have?'
					value={bathroomCount}
					onChange={(value) => setCustomValue('bathroomCount', value)}
				/>
			</div>
		);
	}

	return (
		<Modal
			onSubmit={onNext}
			actionLabel={actionLabel}
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			secondaryActionLabel={secondaryLabel}
			title='Airbnb your home !'
			body={bodyContent}
			disabled={!category}
		/>
	);
}

export default RentModal;
