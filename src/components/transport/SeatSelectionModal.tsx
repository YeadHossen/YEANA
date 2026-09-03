import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Check,
  Armchair,
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Printer,
  Share2,
  Bookmark,
  CheckCircle2,
  QrCode,
  Bus,
  Train,
  Plane,
  Car,
  Ship,
  Info,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Compass,
  Bike,
  CreditCard,
  Wallet,
  Lock,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { TransportRoute, TransportType, SeatInventoryItem } from '../../types';
import { useTrip } from '../../context/TripContext';
import { DataService } from '../../services/dataService';

interface SeatSelectionModalProps {
  route: TransportRoute;
  travelDate: string;
  initialPassengerCount?: number;
  onClose: () => void;
  onBookingSuccess?: (bookingDetails: ConfirmedBooking) => void;
}

export interface ConfirmedBooking {
  bookingId: string;
  route: TransportRoute;
  travelDate: string;
  selectedSeats: string[];
  isFullReserve: boolean;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  passengerGender: 'Male' | 'Female' | 'Other';
  boardingPoint: string;
  droppingPoint: string;
  totalFare: number;
  paymentMethod: 'card' | 'bkash' | 'rocket' | 'nogod';
  transactionId: string;
  bookedAt: string;
}

interface SeatInfo {
  id: string;
  label: string;
  row: number;
  col: number;
  type: 'regular' | 'sleeper_lower' | 'sleeper_upper' | 'window' | 'aisle' | 'cabin' | 'vip' | 'front' | 'rear' | 'bench';
  status: 'available' | 'booked' | 'female_reserved' | 'blocked';
  price: number;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  route,
  travelDate,
  initialPassengerCount = 1,
  onClose,
  onBookingSuccess
}) => {
  const { activeTrip, addCustomStopToTrip, updateTripBudget } = useTrip();

  // Booking Step: 1 = Seat Map & Passenger Info, 2 = Modern Checkout Payment, 3 = Confirmed Digital E-Ticket
  const [step, setStep] = useState<'selection' | 'payment' | 'ticket'>('selection');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nogod' | 'rocket' | 'card'>('bkash');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');

  // Payment form states
  const [cardNumber, setCardNumber] = useState<string>('4321 •••• •••• 9812');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('842');

  const [bkashNumber, setBkashNumber] = useState<string>('');
  const [bkashOtp, setBkashOtp] = useState<string>('582914');
  const [bkashPin, setBkashPin] = useState<string>('•••••');

  const [nagadNumber, setNagadNumber] = useState<string>('');
  const [nagadOtp, setNagadOtp] = useState<string>('716293');
  const [nagadPin, setNagadPin] = useState<string>('••••');

  const [rocketNumber, setRocketNumber] = useState<string>('');
  const [rocketPin, setRocketPin] = useState<string>('••••');

  // Real-time seat inventory from DataService
  const [realInventory, setRealInventory] = useState<SeatInventoryItem[]>([]);

  useEffect(() => {
    DataService.getTransportSeatAvailability(route.id, travelDate).then(inv => {
      setRealInventory(inv);
    });
  }, [route.id, travelDate]);

  // Reserve Mode for Local Vehicles and Cars (Reserve Whole Vehicle vs Shared Seats)
  const isReserveSupported = route.transport_type === 'Local' || route.transport_type === 'Car' || !!route.reserve_price;
  const [isFullReserve, setIsFullReserve] = useState<boolean>(route.transport_type === 'Car');

  // Passenger Count & Selected Seat IDs
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [desiredSeatCount, setDesiredSeatCount] = useState<number>(initialPassengerCount || 1);

  // Passenger details
  const [passengerName, setPassengerName] = useState<string>('');
  const [passengerPhone, setPassengerPhone] = useState<string>('');
  const [passengerEmail, setPassengerEmail] = useState<string>('');
  const [passengerGender, setPassengerGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  // Boarding & Dropping Points
  const defaultBoarding = route.boarding_points?.[0] || `${route.from_district} Main Stand`;
  const [selectedBoarding, setSelectedBoarding] = useState<string>(defaultBoarding);
  const [selectedDropping, setSelectedDropping] = useState<string>(`${route.to_district} Central Drop`);

  // Validation Error
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Calculate Base Price per Seat
  const pricePerSeat = route.price_min || 150;

  // Generate realistic deterministic mock seats based on route ID and vehicle type
  const seatLayout = useMemo(() => {
    const seats: SeatInfo[] = [];
    const seed = Math.abs(
      route.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    );

    // 1. STANDARD & SLEEPER BUS
    if (route.transport_type === 'Bus') {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      rows.forEach((rowLetter, rIdx) => {
        ['1', '2', '3', '4'].forEach((colNum, cIdx) => {
          const seatId = `${rowLetter}${colNum}`;
          const isBooked = ((seed * (rIdx + 1) + cIdx * 7) % 7 === 0) || (rIdx === 0 && cIdx === 0);
          const isFemale = !isBooked && ((seed + rIdx * 3) % 9 === 0);

          seats.push({
            id: seatId,
            label: seatId,
            row: rIdx,
            col: cIdx,
            type: cIdx === 0 || cIdx === 3 ? 'window' : 'aisle',
            status: isBooked ? 'booked' : isFemale ? 'female_reserved' : 'available',
            price: pricePerSeat
          });
        });
      });
    } 
    // 2. BANGLADESH RAILWAY (TRAIN)
    else if (route.transport_type === 'Train') {
      const trainRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
      trainRows.forEach((rowLetter, rIdx) => {
        ['1', '2', '3', '4'].forEach((colNum, cIdx) => {
          const seatId = `${rowLetter}${colNum}`;
          const isBooked = (seed * (rIdx + 2) + cIdx * 5) % 6 === 0;

          seats.push({
            id: seatId,
            label: seatId,
            row: rIdx,
            col: cIdx,
            type: cIdx === 0 || cIdx === 3 ? 'window' : 'aisle',
            status: isBooked ? 'booked' : 'available',
            price: pricePerSeat
          });
        });
      });
    } 
    // 3. DOMESTIC FLIGHT
    else if (route.transport_type === 'Flight') {
      const flightRows = ['1', '2', '3', '4', '5', '6', '7', '8'];
      flightRows.forEach((rowNum, rIdx) => {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach((colLetter, cIdx) => {
          const seatId = `${rowNum}${colLetter}`;
          const isBooked = (seed * (rIdx + 3) + cIdx * 4) % 5 === 0;

          seats.push({
            id: seatId,
            label: seatId,
            row: rIdx,
            col: cIdx,
            type: cIdx === 0 || cIdx === 5 ? 'window' : cIdx === 2 || cIdx === 3 ? 'aisle' : 'regular',
            status: isBooked ? 'booked' : 'available',
            price: rIdx < 2 ? pricePerSeat + 1200 : pricePerSeat
          });
        });
      });
    } 
    // 4. RIVER LAUNCH
    else if (route.transport_type === 'Launch') {
      for (let i = 101; i <= 118; i++) {
        const isBooked = (seed + i) % 4 === 0;
        const isVip = i >= 115;
        seats.push({
          id: `Cabin-${i}`,
          label: `${isVip ? 'VIP ' : ''}C-${i}`,
          row: Math.floor((i - 101) / 3),
          col: (i - 101) % 3,
          type: isVip ? 'vip' : 'cabin',
          status: isBooked ? 'booked' : 'available',
          price: isVip ? pricePerSeat * 3 : pricePerSeat * 1.8
        });
      }
    } 
    // 5. LOCAL VEHICLES (Chander Gari, CNG, Easy Bike, Leguna, Trawler, Bike)
    else if (route.transport_type === 'Local') {
      const cat = route.local_category || 'cng';

      if (cat === 'chander_gari') {
        // 14 Seats Mountain Jeep
        const jeepSeats = [
          { id: 'F1', label: 'Front L', type: 'front' },
          { id: 'F2', label: 'Front R', type: 'front' },
          { id: 'M1', label: 'Mid 1', type: 'bench' },
          { id: 'M2', label: 'Mid 2', type: 'bench' },
          { id: 'M3', label: 'Mid 3', type: 'bench' },
          { id: 'M4', label: 'Mid 4', type: 'bench' },
          { id: 'M5', label: 'Mid 5', type: 'bench' },
          { id: 'M6', label: 'Mid 6', type: 'bench' },
          { id: 'R1', label: 'Rear 1', type: 'rear' },
          { id: 'R2', label: 'Rear 2', type: 'rear' },
          { id: 'R3', label: 'Rear 3', type: 'rear' },
          { id: 'R4', label: 'Rear 4', type: 'rear' },
        ];
        jeepSeats.forEach((s, idx) => {
          const isBooked = (seed + idx * 3) % 7 === 0;
          seats.push({
            id: s.id,
            label: s.label,
            row: Math.floor(idx / 4),
            col: idx % 4,
            type: s.type as any,
            status: isBooked ? 'booked' : 'available',
            price: pricePerSeat
          });
        });
      } else if (cat === 'cng') {
        // 3-4 Passenger CNG
        const cngSeats = [
          { id: 'Left', label: 'Window Left', type: 'window' },
          { id: 'Center', label: 'Center Seat', type: 'regular' },
          { id: 'Right', label: 'Window Right', type: 'window' },
        ];
        cngSeats.forEach((s, idx) => {
          seats.push({
            id: s.id,
            label: s.label,
            row: 0,
            col: idx,
            type: s.type as any,
            status: 'available',
            price: pricePerSeat
          });
        });
      } else if (cat === 'easy_bike') {
        // 6 Seats Battery Auto
        const ebSeats = [
          { id: 'F1', label: 'Front L', type: 'bench' },
          { id: 'F2', label: 'Front Mid', type: 'bench' },
          { id: 'F3', label: 'Front R', type: 'bench' },
          { id: 'B1', label: 'Rear L', type: 'bench' },
          { id: 'B2', label: 'Rear Mid', type: 'bench' },
          { id: 'B3', label: 'Rear R', type: 'bench' },
        ];
        ebSeats.forEach((s, idx) => {
          seats.push({
            id: s.id,
            label: s.label,
            row: Math.floor(idx / 3),
            col: idx % 3,
            type: 'regular',
            status: 'available',
            price: pricePerSeat
          });
        });
      } else if (cat === 'boat_trawler') {
        // 16 Seats Wetland Trawler / Boat
        for (let i = 1; i <= 16; i++) {
          const isBooked = (seed + i) % 5 === 0;
          seats.push({
            id: `Boat-${i}`,
            label: `Seat ${i}`,
            row: Math.floor((i - 1) / 4),
            col: (i - 1) % 4,
            type: i <= 4 ? 'front' : i > 12 ? 'rear' : 'regular',
            status: isBooked ? 'booked' : 'available',
            price: pricePerSeat
          });
        }
      } else if (cat === 'leguna') {
        // 12 Seats Human Hauler
        const legunaSeats = [
          { id: 'F1', label: 'Front Cab' },
          { id: 'L1', label: 'L-Bench 1' },
          { id: 'L2', label: 'L-Bench 2' },
          { id: 'L3', label: 'L-Bench 3' },
          { id: 'L4', label: 'L-Bench 4' },
          { id: 'L5', label: 'L-Bench 5' },
          { id: 'R1', label: 'R-Bench 1' },
          { id: 'R2', label: 'R-Bench 2' },
          { id: 'R3', label: 'R-Bench 3' },
          { id: 'R4', label: 'R-Bench 4' },
          { id: 'R5', label: 'R-Bench 5' },
        ];
        legunaSeats.forEach((s, idx) => {
          seats.push({
            id: s.id,
            label: s.label,
            row: Math.floor(idx / 3),
            col: idx % 3,
            type: 'bench',
            status: (seed + idx) % 6 === 0 ? 'booked' : 'available',
            price: pricePerSeat
          });
        });
      } else {
        // Single Bike Ride
        seats.push({
          id: 'Pillion',
          label: 'Passenger Pillion (1 Rider)',
          row: 0,
          col: 0,
          type: 'regular',
          status: 'available',
          price: pricePerSeat
        });
      }
    } 
    // 6. PRIVATE CAR / MICROBUS
    else {
      const carLabels = ['Front Passenger', 'Middle Left', 'Middle Right', 'Rear Left', 'Rear Center', 'Rear Right', 'Back Seat 1', 'Back Seat 2'];
      carLabels.forEach((label, idx) => {
        seats.push({
          id: `Seat-${idx + 1}`,
          label: label,
          row: Math.floor(idx / 2),
          col: idx % 2,
          type: 'regular',
          status: 'available',
          price: Math.round(pricePerSeat / 4)
        });
      });
    }

    // Apply live overrides from real inventory
    return seats.map(s => {
      const match = realInventory.find(inv => inv.seat_id === s.id);
      if (match) {
        return {
          ...s,
          status: match.status
        };
      }
      return s;
    });
  }, [route, pricePerSeat, realInventory]);

  // Auto-initialize default selected seats matching desired count if none selected
  React.useEffect(() => {
    if (selectedSeatIds.length === 0 && seatLayout.length > 0) {
      const available = seatLayout.filter(s => s.status === 'available');
      if (isFullReserve) {
        setSelectedSeatIds(available.map(s => s.id));
        setDesiredSeatCount(available.length);
      } else {
        const initial = available.slice(0, Math.min(desiredSeatCount, available.length)).map(s => s.id);
        setSelectedSeatIds(initial);
      }
    }
  }, [seatLayout, isFullReserve]);

  // Toggle Full Reserve Mode
  const handleToggleReserve = (reserve: boolean) => {
    setIsFullReserve(reserve);
    const available = seatLayout.filter(s => s.status === 'available');
    if (reserve) {
      setSelectedSeatIds(available.map(s => s.id));
      setDesiredSeatCount(available.length);
    } else {
      setSelectedSeatIds(available.slice(0, 1).map(s => s.id));
      setDesiredSeatCount(1);
    }
  };

  // Handle clicking on an individual seat
  const handleSeatClick = (seat: SeatInfo) => {
    if (seat.status === 'booked' || seat.status === 'blocked') return;
    if (isFullReserve) return; // In full reserve mode, all are selected

    if (selectedSeatIds.includes(seat.id)) {
      const updated = selectedSeatIds.filter(id => id !== seat.id);
      setSelectedSeatIds(updated);
      setDesiredSeatCount(Math.max(1, updated.length));
    } else {
      const updated = [...selectedSeatIds, seat.id];
      setSelectedSeatIds(updated);
      setDesiredSeatCount(updated.length);
    }
    setFormError(null);
  };

  // Handle changing the desired seat count via counter buttons
  const handleCountChange = (newCount: number) => {
    if (isFullReserve) return;
    const count = Math.max(1, Math.min(seatLayout.length || 10, newCount));
    setDesiredSeatCount(count);

    const available = seatLayout.filter(s => s.status === 'available');
    if (selectedSeatIds.length < count) {
      const existing = [...selectedSeatIds];
      for (const seat of available) {
        if (!existing.includes(seat.id) && existing.length < count) {
          existing.push(seat.id);
        }
      }
      setSelectedSeatIds(existing);
    } else if (selectedSeatIds.length > count) {
      setSelectedSeatIds(selectedSeatIds.slice(0, count));
    }
  };

  // Calculate Total Fare
  const totalFare = useMemo(() => {
    if (isFullReserve && route.reserve_price) {
      return route.reserve_price;
    }
    return selectedSeatIds.reduce((sum, seatId) => {
      const seat = seatLayout.find(s => s.id === seatId);
      return sum + (seat ? seat.price : pricePerSeat);
    }, 0);
  }, [selectedSeatIds, seatLayout, pricePerSeat, isFullReserve, route.reserve_price]);

  // Stage 1: Validate seat selection & proceed to modern payment gateway
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSeatIds.length === 0) {
      setFormError('Please select at least 1 seat on the layout.');
      return;
    }

    if (!passengerName.trim()) {
      setFormError('Please enter passenger full name.');
      return;
    }

    if (!passengerPhone.trim() || passengerPhone.trim().length < 9) {
      setFormError('Please enter a valid mobile number (e.g. 017xxxxxxxx).');
      return;
    }

    setFormError(null);
    if (!bkashNumber) setBkashNumber(passengerPhone.trim());
    if (!nagadNumber) setNagadNumber(passengerPhone.trim());
    if (!rocketNumber) setRocketNumber(passengerPhone.trim() + '8');
    if (!cardHolder) setCardHolder(passengerName.trim());

    setStep('payment');
  };

  // Stage 2: Process payment with chosen Bangladeshi gateway (Card, bKash, Rocket, Nagad)
  const handleExecutePayment = async () => {
    setIsProcessingPayment(true);
    setProcessingStatus(`Connecting to ${paymentMethod.toUpperCase()} Secure Payment Gateway...`);
    
    await new Promise(r => setTimeout(r, 600));
    setProcessingStatus(`Authorizing ৳${totalFare} BDT with Bangladesh Bank Payment Systems...`);
    
    await new Promise(r => setTimeout(r, 700));

    const prefix = paymentMethod === 'bkash' ? 'BK' : paymentMethod === 'nogod' ? 'NG' : paymentMethod === 'rocket' ? 'RK' : 'CD';
    const txnId = `TXN-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingId = `YN-${route.transport_type.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const booking: ConfirmedBooking = {
      bookingId,
      route,
      travelDate,
      selectedSeats: selectedSeatIds,
      isFullReserve,
      passengerName: passengerName.trim(),
      passengerPhone: passengerPhone.trim(),
      passengerEmail: passengerEmail.trim() || 'traveler@yeana.bd',
      passengerGender,
      boardingPoint: selectedBoarding,
      droppingPoint: selectedDropping,
      totalFare,
      paymentMethod,
      transactionId: txnId,
      bookedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };

    // Persist to shared DataService
    await DataService.createTransportBooking({
      id: bookingId,
      route_id: route.id,
      route,
      company: route.company,
      transport_type: route.transport_type,
      from_district: route.from_district,
      to_district: route.to_district,
      departure_time: route.departure_time,
      travel_date: travelDate,
      selected_seats: selectedSeatIds,
      seat_count: selectedSeatIds.length,
      is_full_reserve: isFullReserve,
      passenger_name: passengerName.trim(),
      passenger_phone: passengerPhone.trim(),
      passenger_email: passengerEmail.trim() || 'traveler@yeana.bd',
      passenger_gender: passengerGender,
      boarding_point: selectedBoarding,
      dropping_point: selectedDropping,
      total_fare: totalFare,
      payment_method: paymentMethod,
      transaction_id: txnId,
      status: 'confirmed'
    });

    setConfirmedBooking(booking);
    setIsProcessingPayment(false);
    setStep('ticket');

    // Auto-update active trip planner budget & add stop if active trip exists
    if (activeTrip) {
      addCustomStopToTrip(
        activeTrip.id,
        `${route.transport_type === 'Local' ? (route.local_vehicle_name || 'Local Transport') : route.transport_type}: ${route.company} (${isFullReserve ? 'Full Reserve' : `${selectedSeatIds.length} Seats`})`,
        1,
        route.departure_time.split('/')[0],
        `Boarding: ${selectedBoarding} ➔ Dropping: ${selectedDropping}. Fare: ৳${totalFare} BDT. Paid via: ${paymentMethod.toUpperCase()} (TXN: ${txnId})`
      );
      updateTripBudget(activeTrip.id, {
        ...activeTrip.budget,
        transport: activeTrip.budget.transport + totalFare
      });
    }

    if (onBookingSuccess) {
      onBookingSuccess(booking);
    }
  };

  const handleCopyTicket = () => {
    if (!confirmedBooking) return;
    const text = `YEANA E-TICKET & LOCAL TRANSIT PASS\n` +
      `Booking ID: ${confirmedBooking.bookingId}\n` +
      `Vehicle: ${confirmedBooking.route.local_vehicle_name || confirmedBooking.route.company} (${confirmedBooking.route.transport_type})\n` +
      `Type: ${confirmedBooking.isFullReserve ? 'EXCLUSIVE FULL VEHICLE RESERVE' : 'SHARED SEATS'}\n` +
      `Route: ${confirmedBooking.route.from_district} ➔ ${confirmedBooking.route.to_district}\n` +
      `Journey Date: ${confirmedBooking.travelDate}\n` +
      `Seats: ${confirmedBooking.selectedSeats.join(', ')} (${confirmedBooking.selectedSeats.length} Seats)\n` +
      `Lead Passenger: ${confirmedBooking.passengerName} (${confirmedBooking.passengerPhone})\n` +
      `Boarding Stand: ${confirmedBooking.boardingPoint}\n` +
      `Payment: PAID VIA ${confirmedBooking.paymentMethod.toUpperCase()} (TXN: ${confirmedBooking.transactionId})\n` +
      `Total Fare: ৳${confirmedBooking.totalFare} BDT (VERIFIED / PAID)\n` +
      `Stand Hotline: ${confirmedBooking.route.contact_phone || 'Local Drivers Union'}`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const getTransportIcon = (type: TransportType) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-emerald-600" />;
      case 'Flight': return <Plane className="w-5 h-5 text-sky-600" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-600" />;
      case 'Launch': return <Ship className="w-5 h-5 text-teal-600" />;
      case 'Local': return <Compass className="w-5 h-5 text-amber-600" />;
      default: return <Bus className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              {getTransportIcon(route.transport_type)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {route.local_vehicle_name || `${route.transport_type} Reservation`}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {travelDate}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {route.company}
              </h2>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                <span>{route.from_district}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{route.to_district}</span>
                <span className="text-slate-300">•</span>
                <span>{route.departure_time.split('/')[0]}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Modern Booking Indicator */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-center gap-2 overflow-x-auto text-xs font-bold scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-3 flex-nowrap">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all whitespace-nowrap ${
              step === 'selection' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">1</span>
              <span>Seats & Passengers</span>
            </span>

            <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all whitespace-nowrap ${
              step === 'payment' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">2</span>
              <span>Payment (Card / bKash / Rocket / Nagad)</span>
            </span>

            <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all whitespace-nowrap ${
              step === 'ticket' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400'
            }`}>
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black">3</span>
              <span>Digital Pass</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: INTERACTIVE SEAT SELECTION & PASSENGER INFORMATION               */}
        {/* ========================================================================= */}
        {step === 'selection' && (
          <div className="p-5 sm:p-8 space-y-8 flex-1">
            
            {/* Top Interactive Booking Mode & Passenger Selector Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-elevated">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    {isFullReserve ? 'Full Vehicle Reserve Mode' : 'Seat Selection Mode'}
                  </span>
                </div>
                <p className="text-sm font-bold text-white">
                  {isFullReserve ? 'Reserving the Entire Vehicle exclusively for your group' : 'Choose how many seats you want to reserve'}
                </p>
                <p className="text-xs text-slate-300">
                  {isFullReserve ? 'Full vehicle capacity is locked for your trip.' : 'Click directly on the interactive seats below.'}
                </p>
              </div>

              {/* Reserve Mode Toggle & Counter */}
              <div className="flex items-center gap-3 flex-wrap">
                {isReserveSupported && (
                  <div className="flex items-center bg-white/10 p-1 rounded-2xl border border-white/20">
                    <button
                      type="button"
                      onClick={() => handleToggleReserve(false)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        !isFullReserve ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Shared Seats
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleReserve(true)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isFullReserve ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Reserve Whole ({route.reserve_price ? `৳${route.reserve_price}` : 'Full'})
                    </button>
                  </div>
                )}

                {!isFullReserve && (
                  <div className="flex items-center gap-2 bg-white/10 p-1 rounded-2xl border border-white/20">
                    <button
                      type="button"
                      onClick={() => handleCountChange(desiredSeatCount - 1)}
                      disabled={desiredSeatCount <= 1}
                      className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      -
                    </button>
                    <div className="px-2.5 text-center">
                      <span className="text-base font-black text-white font-mono">{desiredSeatCount}</span>
                      <span className="block text-[9px] uppercase font-bold text-emerald-300">Seats</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCountChange(desiredSeatCount + 1)}
                      disabled={desiredSeatCount >= (seatLayout.length || 10)}
                      className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Layout Grid (Seat Layout + Booking Form) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT: VISUAL INTERACTIVE VEHICLE SEAT MAP (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Armchair className="w-4 h-4 text-emerald-600" />
                    <span>
                      {route.transport_type === 'Local' ? (route.local_vehicle_name || 'Local Vehicle Map') : `Interactive ${route.transport_type} Cabin Map`}
                    </span>
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {isFullReserve ? `৳${route.reserve_price || totalFare} Total Reserve` : `৳${pricePerSeat} / Seat`}
                  </span>
                </div>

                {/* Seat Map Legend & Live Stats */}
                <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600 flex-wrap bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-emerald-600 border border-emerald-700 flex items-center justify-center text-[10px] text-white">
                        ✓
                      </div>
                      <span>Selected ({selectedSeatIds.length})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-white border-2 border-slate-300" />
                      <span className="text-emerald-700 font-black">Available ({seatLayout.filter(s => s.status === 'available').length})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-slate-300 border border-slate-400 opacity-60" />
                      <span>Booked ({seatLayout.filter(s => s.status === 'booked').length})</span>
                    </div>
                    {seatLayout.some(s => s.status === 'blocked') && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-md bg-amber-500 border border-amber-600" />
                        <span className="text-amber-800 font-bold">VIP/Blocked ({seatLayout.filter(s => s.status === 'blocked').length})</span>
                      </div>
                    )}
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-slate-200 text-slate-800 text-[11px] font-black">
                    Total {seatLayout.length} Seats
                  </span>
                </div>

                {/* Vehicle Cabin Container */}
                <div className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 text-white shadow-card space-y-6">
                  
                  {/* Front Driver / Cockpit Indicator */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-black">
                        {route.transport_type === 'Flight' ? '✈️' : route.transport_type === 'Launch' ? '🚢' : route.local_category === 'boat_trawler' ? '⛵' : '💺'}
                      </div>
                      <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                        {route.transport_type === 'Flight' ? 'Flight Cockpit' : route.transport_type === 'Launch' || route.local_category === 'boat_trawler' ? 'Captain Wheel & Bow' : 'Driver Seat (Front)'}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {isFullReserve ? 'Entire Vehicle Reserved' : 'Front Direction'}
                    </span>
                  </div>

                  {/* SEATS GRID FOR BUS */}
                  {route.transport_type === 'Bus' && (
                    <div className="space-y-3">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((rowLetter) => {
                        const rowSeats = seatLayout.filter(s => s.id.startsWith(rowLetter));
                        return (
                          <div key={rowLetter} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {rowSeats.slice(0, 2).map((seat) => {
                                const isSelected = selectedSeatIds.includes(seat.id);
                                const isBooked = seat.status === 'booked';
                                const isFemale = seat.status === 'female_reserved';

                                return (
                                  <button
                                    key={seat.id}
                                    type="button"
                                    onClick={() => handleSeatClick(seat)}
                                    disabled={isBooked}
                                    className={`w-11 h-11 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center relative active:scale-95 ${
                                      isSelected
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300'
                                        : isBooked
                                        ? 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed'
                                        : isFemale
                                        ? 'bg-pink-950 text-pink-300 border border-pink-700/50 hover:bg-pink-900'
                                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                    }`}
                                  >
                                    <span className="text-[11px] leading-none">{seat.label}</span>
                                    <span className="text-[8px] opacity-70 leading-none mt-0.5">
                                      {seat.type === 'window' ? 'Win' : 'Aisle'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            <div className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest px-2">
                              Aisle
                            </div>

                            <div className="flex items-center gap-2">
                              {rowSeats.slice(2, 4).map((seat) => {
                                const isSelected = selectedSeatIds.includes(seat.id);
                                const isBooked = seat.status === 'booked';
                                const isFemale = seat.status === 'female_reserved';

                                return (
                                  <button
                                    key={seat.id}
                                    type="button"
                                    onClick={() => handleSeatClick(seat)}
                                    disabled={isBooked}
                                    className={`w-11 h-11 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center relative active:scale-95 ${
                                      isSelected
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300'
                                        : isBooked
                                        ? 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed'
                                        : isFemale
                                        ? 'bg-pink-950 text-pink-300 border border-pink-700/50 hover:bg-pink-900'
                                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                    }`}
                                  >
                                    <span className="text-[11px] leading-none">{seat.label}</span>
                                    <span className="text-[8px] opacity-70 leading-none mt-0.5">
                                      {seat.type === 'window' ? 'Win' : 'Aisle'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SEATS GRID FOR LOCAL VEHICLES & TRAINS & FLIGHTS */}
                  {route.transport_type !== 'Bus' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
                      {seatLayout.map((seat) => {
                        const isSelected = selectedSeatIds.includes(seat.id);
                        const isBooked = seat.status === 'booked';

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => handleSeatClick(seat)}
                            disabled={isBooked}
                            className={`p-3.5 rounded-2xl font-black text-xs transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 ${
                              isSelected
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300'
                                : isBooked
                                ? 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                            }`}
                          >
                            <Armchair className="w-4 h-4" />
                            <span className="text-xs leading-none text-center">{seat.label}</span>
                            <span className="text-[10px] text-emerald-400 font-mono">
                              {isFullReserve ? 'Reserved' : `৳${seat.price}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Vehicle Tag / Amenities Indicator */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase flex-wrap gap-2">
                    <span>{route.transport_type === 'Local' ? (route.local_vehicle_name || 'Local Transit') : 'Verified Corridor'}</span>
                    <span>{route.schedule_days}</span>
                  </div>

                </div>

                {/* Selected Seats Pills Summary */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                      {isFullReserve ? 'Full Vehicle Reserved' : `Selected Seats (${selectedSeatIds.length})`}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                      {selectedSeatIds.length > 0 ? (
                        selectedSeatIds.map(id => (
                          <span
                            key={id}
                            className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-xs"
                          >
                            {id}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-700 italic">No seats selected yet</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-800 uppercase font-bold">Total Fare</span>
                    <p className="text-lg font-black text-emerald-900 font-mono">৳{totalFare}</p>
                  </div>
                </div>

              </div>

              {/* RIGHT: PASSENGER DETAILS & BOARDING INFORMATION FORM (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <form onSubmit={handleProceedToPayment} className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Passenger & Boarding Stand</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Enter lead passenger information for instant verification & SMS.
                    </p>
                  </div>

                  {/* Error Message */}
                  {formError && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Passenger Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Lead Passenger Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Yead Hossen"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mobile Number (For Ticket SMS)</span> <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      placeholder="e.g. 01712345678"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  {/* Email & Gender Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        placeholder="traveler@email.com"
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Gender
                      </label>
                      <select
                        value={passengerGender}
                        onChange={(e: any) => setPassengerGender(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Boarding Point Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Select Boarding Point / Stand</span>
                    </label>
                    <select
                      value={selectedBoarding}
                      onChange={(e) => setSelectedBoarding(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      {route.boarding_points?.map((bp, i) => (
                        <option key={i} value={bp}>{bp}</option>
                      ))}
                      <option value={`${route.from_district} Upazila Central Stand`}>
                        {route.from_district} Upazila Central Stand
                      </option>
                    </select>
                  </div>

                  {/* Dropping Point */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Dropping Point / Final Stand</span>
                    </label>
                    <input
                      type="text"
                      value={selectedDropping}
                      onChange={(e) => setSelectedDropping(e.target.value)}
                      placeholder="e.g. Destination Stand / Resort"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50 focus:outline-none"
                    />
                  </div>

                  {/* Price Breakdown Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>
                        {isFullReserve ? 'Full Vehicle Reserve' : `Seat Fare (৳${pricePerSeat} × ${selectedSeatIds.length} seats)`}
                      </span>
                      <span className="font-mono font-bold text-slate-900">৳{totalFare}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>YEANA Platform Booking Fee</span>
                      <span className="text-emerald-700 font-bold">FREE (৳0)</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>Verified Union & Passenger Safety</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                      <span className="font-black text-slate-900 text-sm">Total Payable</span>
                      <span className="text-xl font-black text-emerald-700 font-mono">৳{totalFare} BDT</span>
                    </div>
                  </div>

                  {/* Submit / Confirm Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-elevated transition-all"
                  >
                    <span>Proceed to Payment (Card, bKash, Rocket, Nagad)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant payment gateway with official transaction ID & e-ticket</span>
                  </p>

                </form>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: MODERN CHECKOUT & BANGLADESHI PAYMENT GATEWAYS                    */}
        {/* (Card, bKash, Rocket, Nagad)                                             */}
        {/* ========================================================================= */}
        {step === 'payment' && (
          <div className="p-5 sm:p-8 space-y-6 flex-1 bg-slate-50/60">
            {/* Top Navigation & Amount bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setStep('selection')}
                className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Seat Selection</span>
              </button>

              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800">Total Payable:</span>
                <span className="text-base font-black text-emerald-900 font-mono">৳{totalFare} BDT</span>
              </div>
            </div>

            {/* Grid Layout: Booking Summary (Left) + Payment Methods (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Order Review */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Order Summary</span>
                    <h3 className="text-sm font-black text-slate-900">{route.company}</h3>
                    <p className="text-xs text-slate-500">{route.local_vehicle_name || route.transport_type}</p>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Route:</span>
                      <span className="font-bold text-slate-900">{route.from_district} ➔ {route.to_district}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Journey Date:</span>
                      <span className="font-bold text-slate-900">{travelDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Departure Time:</span>
                      <span className="font-bold text-slate-900">{route.departure_time.split('/')[0]}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Seats / Capacity:</span>
                      <span className="font-bold text-emerald-700">
                        {isFullReserve ? 'Full Vehicle Reserve' : `${selectedSeatIds.join(', ')} (${selectedSeatIds.length} Seats)`}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Lead Passenger:</span>
                      <span className="font-bold text-slate-900">{passengerName}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Mobile:</span>
                      <span className="font-mono text-slate-900">{passengerPhone}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Boarding Stand:</span>
                      <span className="font-bold text-slate-800 text-right truncate max-w-[140px]">{selectedBoarding}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Seat Fare</span>
                      <span className="font-mono font-bold text-slate-800">৳{totalFare}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>YEANA Booking Fee</span>
                      <span className="text-emerald-600 font-bold">FREE (৳0)</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Union Safety & Insurance</span>
                      <span className="text-emerald-600 font-bold">Included</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                      <span className="text-xs font-black text-slate-900">Total Payable</span>
                      <span className="text-lg font-black text-emerald-700 font-mono">৳{totalFare} BDT</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bangladesh Bank PSD Regulated</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Payments are protected by 256-bit TLS encryption in compliance with Bangladesh Bank Payment Systems Department (PSD) rules. We never store PIN or CVV.
                  </p>
                </div>
              </div>

              {/* Right Column: Bangladeshi Payment Gateway Options */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Method Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
                      paymentMethod === 'bkash'
                        ? 'bg-[#E2136E] text-white border-[#C20F5D] shadow-lg shadow-[#E2136E]/20 scale-[1.02]'
                        : 'bg-white hover:bg-pink-50/50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        paymentMethod === 'bkash' ? 'bg-white/20 text-white' : 'bg-pink-100 text-[#E2136E]'
                      }`}>
                        MFS
                      </span>
                      {paymentMethod === 'bkash' && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">bKash</h4>
                      <p className={`text-[10px] font-bold ${paymentMethod === 'bkash' ? 'text-pink-100' : 'text-slate-500'}`}>
                        বিকাশ পেমেন্ট
                      </p>
                    </div>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nogod')}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
                      paymentMethod === 'nogod'
                        ? 'bg-[#F7941D] text-white border-[#DE8114] shadow-lg shadow-[#F7941D]/20 scale-[1.02]'
                        : 'bg-white hover:bg-orange-50/50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        paymentMethod === 'nogod' ? 'bg-white/20 text-white' : 'bg-orange-100 text-[#F7941D]'
                      }`}>
                        Post MFS
                      </span>
                      {paymentMethod === 'nogod' && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">Nagad</h4>
                      <p className={`text-[10px] font-bold ${paymentMethod === 'nogod' ? 'text-orange-100' : 'text-slate-500'}`}>
                        নগদ পেমেন্ট
                      </p>
                    </div>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('rocket')}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
                      paymentMethod === 'rocket'
                        ? 'bg-[#8C3494] text-white border-[#722579] shadow-lg shadow-[#8C3494]/20 scale-[1.02]'
                        : 'bg-white hover:bg-purple-50/50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        paymentMethod === 'rocket' ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#8C3494]'
                      }`}>
                        DBBL
                      </span>
                      {paymentMethod === 'rocket' && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">Rocket</h4>
                      <p className={`text-[10px] font-bold ${paymentMethod === 'rocket' ? 'text-purple-100' : 'text-slate-500'}`}>
                        রকেট (ডাচ-বাংলা)
                      </p>
                    </div>
                  </button>

                  {/* Debit / Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 ${
                      paymentMethod === 'card'
                        ? 'bg-slate-900 text-white border-slate-950 shadow-lg shadow-slate-900/20 scale-[1.02]'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        paymentMethod === 'card' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        Bank
                      </span>
                      {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">Card</h4>
                      <p className={`text-[10px] font-bold ${paymentMethod === 'card' ? 'text-slate-300' : 'text-slate-500'}`}>
                        Visa / Master / Nexus
                      </p>
                    </div>
                  </button>
                </div>

                {/* Gateway Specific Form Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card relative overflow-hidden">
                  
                  {/* 1. bKash View */}
                  {paymentMethod === 'bkash' && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-black text-sm shadow-sm">
                            ব
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[#E2136E]">bKash Payment Gateway</h4>
                            <p className="text-[11px] text-slate-500">Merchant Account • YEANA Transit Services</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-[#E2136E] bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                          ৳{totalFare} BDT
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Your bKash Account Number
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={bkashNumber}
                              onChange={(e) => setBkashNumber(e.target.value)}
                              placeholder="017XXXXXXXX"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#E2136E] focus:ring-2 focus:ring-[#E2136E]/20"
                            />
                            <span className="absolute right-3 top-3 text-[11px] font-bold text-slate-400">Personal</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Verification Code (OTP)
                            </label>
                            <input
                              type="text"
                              value={bkashOtp}
                              onChange={(e) => setBkashOtp(e.target.value)}
                              placeholder="6-digit OTP"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#E2136E]"
                            />
                            <span className="text-[10px] text-slate-400 mt-1 block">Simulated OTP: 582914</span>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              bKash 5-Digit PIN
                            </label>
                            <input
                              type="password"
                              value={bkashPin}
                              onChange={(e) => setBkashPin(e.target.value)}
                              placeholder="•••••"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#E2136E]"
                            />
                            <span className="text-[10px] text-slate-400 mt-1 block">End-to-end encrypted</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleExecutePayment}
                        disabled={isProcessingPayment}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E2136E] to-[#C20F5D] hover:from-[#C20F5D] hover:to-[#A00C4C] text-white text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-[#E2136E]/30 active:scale-98 transition-all disabled:opacity-50"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay ৳{totalFare} BDT with bKash</span>
                      </button>
                    </div>
                  )}

                  {/* 2. Nagad View */}
                  {paymentMethod === 'nogod' && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#F7941D] text-white flex items-center justify-center font-black text-sm shadow-sm">
                            ন
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[#F7941D]">Nagad Payment Gateway</h4>
                            <p className="text-[11px] text-slate-500">Postal Department Digital Service • YEANA Travel</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-[#F7941D] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                          ৳{totalFare} BDT
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Your Nagad Account Number
                          </label>
                          <input
                            type="tel"
                            value={nagadNumber}
                            onChange={(e) => setNagadNumber(e.target.value)}
                            placeholder="01XXXXXXXXX"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#F7941D] focus:ring-2 focus:ring-[#F7941D]/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              OTP Verification Code
                            </label>
                            <input
                              type="text"
                              value={nagadOtp}
                              onChange={(e) => setNagadOtp(e.target.value)}
                              placeholder="6-digit OTP"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#F7941D]"
                            />
                            <span className="text-[10px] text-slate-400 mt-1 block">Simulated OTP: 716293</span>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Nagad 4-Digit PIN
                            </label>
                            <input
                              type="password"
                              value={nagadPin}
                              onChange={(e) => setNagadPin(e.target.value)}
                              placeholder="••••"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#F7941D]"
                            />
                            <span className="text-[10px] text-slate-400 mt-1 block">Protected by Nagad Shield</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleExecutePayment}
                        disabled={isProcessingPayment}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F7941D] to-[#DE8114] hover:from-[#DE8114] hover:to-[#B86506] text-white text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-[#F7941D]/30 active:scale-98 transition-all disabled:opacity-50"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay ৳{totalFare} BDT with Nagad</span>
                      </button>
                    </div>
                  )}

                  {/* 3. Rocket View */}
                  {paymentMethod === 'rocket' && (
                    <div className="space-y-5 animate-in fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#8C3494] text-white flex items-center justify-center font-black text-sm shadow-sm">
                            DBBL
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[#8C3494]">Rocket (Dutch-Bangla Bank)</h4>
                            <p className="text-[11px] text-slate-500">Core Banking Electronic Gateway • YEANA Travel</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-[#8C3494] bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                          ৳{totalFare} BDT
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Rocket 12-Digit Mobile Account Number (with check digit)
                          </label>
                          <input
                            type="tel"
                            value={rocketNumber}
                            onChange={(e) => setRocketNumber(e.target.value)}
                            placeholder="01XXXXXXXXXX"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#8C3494] focus:ring-2 focus:ring-[#8C3494]/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Rocket 4-Digit Security PIN
                          </label>
                          <input
                            type="password"
                            value={rocketPin}
                            onChange={(e) => setRocketPin(e.target.value)}
                            placeholder="••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#8C3494]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleExecutePayment}
                        disabled={isProcessingPayment}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8C3494] to-[#722579] hover:from-[#722579] hover:to-[#55185B] text-white text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-[#8C3494]/30 active:scale-98 transition-all disabled:opacity-50"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay ৳{totalFare} BDT with Rocket</span>
                      </button>
                    </div>
                  )}

                  {/* 4. Card View */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-5 animate-in fade-in">
                      {/* Virtual Card Graphic */}
                      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-xl space-y-4 border border-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                            YEANA SECURE PAY
                          </span>
                          <div className="flex items-center gap-1.5 text-xs font-black">
                            <CreditCard className="w-4 h-4 text-emerald-400" />
                            <span>VISA / MASTERCARD / NEXUS</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Card Number</p>
                          <p className="font-mono text-lg sm:text-xl font-bold tracking-widest text-slate-100">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Cardholder</p>
                            <p className="font-bold tracking-wide uppercase truncate max-w-[180px]">
                              {cardHolder || 'TRAVELER NAME'}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase">Expires</p>
                            <p className="font-mono font-bold">{cardExpiry || 'MM/YY'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4321 •••• •••• 9812"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Name on Card</label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="e.g. MOHAMMED YEAD"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Expiry Date</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">CVV / CVC</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleExecutePayment}
                        disabled={isProcessingPayment}
                        className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 active:scale-98 transition-all disabled:opacity-50"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay ৳{totalFare} BDT with Card</span>
                      </button>
                    </div>
                  )}

                  {/* Payment Loading Modal Overlay */}
                  {isProcessingPayment && (
                    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-white text-center space-y-4 z-20 animate-in fade-in duration-150">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-black">Authorizing Payment</h4>
                        <p className="text-xs text-slate-300 font-medium">{processingStatus}</p>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>256-Bit SSL Encrypted & Verified</span>
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: CONFIRMED DIGITAL E-TICKET BOARDING PASS                          */}
        {/* ========================================================================= */}
        {step === 'ticket' && confirmedBooking && (
          <div className="p-5 sm:p-8 space-y-6 flex-1 bg-slate-50">
            
            {/* Success Banner */}
            <div className="p-5 rounded-3xl bg-emerald-600 text-white flex items-center justify-between gap-4 shadow-elevated">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black">Transit Reservation Confirmed!</h3>
                  <p className="text-xs text-emerald-100">
                    {confirmedBooking.isFullReserve ? 'Full Vehicle Reserved. Show this pass at the counter/driver.' : 'Your seats are locked. Show this pass at the counter.'}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-200">Transit PNR</span>
                <p className="text-base font-black font-mono tracking-wider">{confirmedBooking.bookingId}</p>
              </div>
            </div>

            {/* Notification Toast for Copy */}
            {copiedNotification && (
              <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 justify-center animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Ticket details copied to clipboard!</span>
              </div>
            )}

            {/* Printable Digital Boarding Pass Card */}
            <div id="yeana-e-ticket-card" className="bg-white rounded-3xl border-2 border-slate-200 shadow-card overflow-hidden">
              
              {/* Header of Ticket */}
              <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-black">
                    {getTransportIcon(confirmedBooking.route.transport_type)}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                      YEANA Verified Transit Pass
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      {confirmedBooking.route.local_vehicle_name || confirmedBooking.route.company}
                    </h4>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Booking Reference</span>
                  <p className="text-base font-black font-mono text-emerald-400">{confirmedBooking.bookingId}</p>
                </div>
              </div>

              {/* Body of Ticket */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Journey Corridor */}
                <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 text-center">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Origin</span>
                    <p className="text-base sm:text-lg font-black text-slate-900">{confirmedBooking.route.from_district}</p>
                    <p className="text-xs font-bold text-emerald-700">{confirmedBooking.route.departure_time.split('/')[0]}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-extrabold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {confirmedBooking.route.duration}
                    </span>
                    <div className="w-full flex items-center justify-center my-1">
                      <div className="h-0.5 bg-emerald-500 w-full relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-600 rotate-45" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{confirmedBooking.travelDate}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Destination</span>
                    <p className="text-base sm:text-lg font-black text-slate-900">{confirmedBooking.route.to_district}</p>
                    <p className="text-xs font-bold text-slate-600">{confirmedBooking.route.arrival_time.split('/')[0]}</p>
                  </div>
                </div>

                {/* 4-Grid Meta Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Passenger</span>
                    <p className="font-black text-slate-900">{confirmedBooking.passengerName}</p>
                    <p className="text-[11px] text-slate-500">{confirmedBooking.passengerPhone}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">
                      {confirmedBooking.isFullReserve ? 'Reservation' : 'Seats Reserved'}
                    </span>
                    <p className="font-black text-emerald-950 text-sm">
                      {confirmedBooking.isFullReserve ? 'FULL VEHICLE' : confirmedBooking.selectedSeats.join(', ')}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-semibold">
                      {confirmedBooking.isFullReserve ? 'Exclusive Charter' : `${confirmedBooking.selectedSeats.length} Seats`}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Boarding Stand</span>
                    <p className="font-bold text-slate-900 line-clamp-2">{confirmedBooking.boardingPoint}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Payment & Status</span>
                    <p className="text-sm font-black text-emerald-700 font-mono">৳{confirmedBooking.totalFare} BDT</p>
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black inline-block uppercase">
                        PAID VIA {confirmedBooking.paymentMethod.toUpperCase()}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        {confirmedBooking.transactionId}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Barcode & QR Code Section */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
                      <QrCode className="w-full h-full text-slate-900" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black">Scan QR at Stand or Show Driver</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {confirmedBooking.bookingId} • {confirmedBooking.bookedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-300">
                      Union Helpline: {confirmedBooking.route.contact_phone || 'Direct Counter'}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => window.print()}
                className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Print / Save Pass</span>
              </button>

              <button
                onClick={handleCopyTicket}
                className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
                <span>Copy Pass Details</span>
              </button>

              <button
                onClick={onClose}
                className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Done & Return</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
