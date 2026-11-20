import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { X, Loader2, ShoppingCart, Heart, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { cartApi, donationsApi, type CartItem, type Donation } from '../api/cart'

function formatILS(amount: number) {
  return `₪${amount.toLocaleString('he-IL')}`
}

export default function Cart() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const qc = useQueryClient()

  // Donation form state
  const [donationAmount, setDonationAmount] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)
  const [monthlyDay, setMonthlyDay] = useState(1)
  const [addingDonation, setAddingDonation] = useState(false)
  const [donationError, setDonationError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  const { data: cartItems = [], isLoading: cartLoading } = useQuery<CartItem[]>({
    queryKey: ['cart', user?.id],
    queryFn: () => cartApi.getUnpaid(user!.id),
    enabled: !!user,
  })

  const { data: donations = [], isLoading: donationsLoading } = useQuery<Donation[]>({
    queryKey: ['donations', user?.id],
    queryFn: () => donationsApi.getUnpaid(user!.id),
    enabled: !!user,
  })

  const { mutate: removeCartItem, isPending: removingCart } = useMutation({
    mutationFn: (id: string) => cartApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart', user?.id] }),
  })

  const { mutate: removeDonation, isPending: removingDonation } = useMutation({
    mutationFn: (id: string) => donationsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['donations', user?.id] }),
  })

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number(donationAmount)
    if (!amount || amount <= 0) {
      setDonationError('הזינו סכום תקין')
      return
    }
    if (isMonthly && (monthlyDay < 1 || monthlyDay > 28)) {
      setDonationError('יום החיוב חייב להיות בין 1 ל-28')
      return
    }
    setAddingDonation(true)
    setDonationError('')
    try {
      await donationsApi.create({
        amount,
        is_monthly: isMonthly,
        monthly_day: isMonthly ? monthlyDay : undefined,
      })
      qc.invalidateQueries({ queryKey: ['donations', user?.id] })
      setDonationAmount('')
      setIsMonthly(false)
      setMonthlyDay(1)
    } catch (err: unknown) {
      setDonationError(err instanceof Error ? err.message : 'שגיאה בהוספת התרומה')
    } finally {
      setAddingDonation(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-[#1e40af]" />
      </div>
    )
  }

  if (!user) return null

  const servicesTotal = cartItems.reduce((sum, item) => sum + (item.payment_plan?.amount ?? 0), 0)
  const donationsTotal = donations.reduce((sum, d) => sum + d.amount, 0)
  const grandTotal = servicesTotal + donationsTotal

  const isEmpty = cartItems.length === 0 && donations.length === 0

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFF] px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-7">
          <h1 className="text-[26px] font-black text-[#1e1b4b]">סל קניות</h1>
          <p className="text-[13px] text-[#6b7280] mt-0.5">סקירת שירותים ותרומות לפני תשלום</p>
        </div>

        {/* Empty state */}
        {!cartLoading && !donationsLoading && isEmpty && (
          <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-sm flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4">
              <ShoppingCart size={28} className="text-[#4338ca]" />
            </div>
            <p className="text-[16px] font-semibold text-[#1e1b4b] mb-1">הסל ריק</p>
            <p className="text-[13px] text-[#6b7280]">הוסיפו שירותים מדף השירותים או הוסיפו תרומה כאן</p>
          </div>
        )}

        {/* Services section */}
        {(cartLoading || cartItems.length > 0) && (
          <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-sm mb-5 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center gap-2">
              <ShoppingCart size={16} className="text-[#1e40af]" />
              <h2 className="text-[15px] font-bold text-[#1e1b4b]">שירותים</h2>
              <span className="mr-auto text-[13px] text-[#6b7280]">
                {cartItems.length} פריטים
              </span>
            </div>

            {cartLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={22} className="animate-spin text-[#1e40af]" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-[#9ca3af]">אין שירותים בסל</div>
            ) : (
              <div className="divide-y divide-[#f3f4f6]">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    {item.payment_plan?.image_url ? (
                      <img
                        src={item.payment_plan.image_url}
                        alt={item.payment_plan.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
                        <ShoppingCart size={18} className="text-[#4338ca]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#1e1b4b] truncate">
                        {item.payment_plan?.title ?? 'שירות'}
                      </p>
                      {item.payment_plan?.subtitle && (
                        <p className="text-[12px] text-[#6b7280] truncate">{item.payment_plan.subtitle}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[14px] font-bold text-[#1e40af]">
                        {item.payment_plan ? formatILS(item.payment_plan.amount) : '—'}
                      </span>
                      <button
                        onClick={() => removeCartItem(item.id)}
                        disabled={removingCart}
                        className="w-7 h-7 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                        title="הסר"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Donations section */}
        <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-sm mb-5 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f3f4f6] flex items-center gap-2">
            <Heart size={16} className="text-[#e11d48]" />
            <h2 className="text-[15px] font-bold text-[#1e1b4b]">תרומות</h2>
            {donations.length > 0 && (
              <span className="mr-auto text-[13px] text-[#6b7280]">
                {donations.length} תרומות
              </span>
            )}
          </div>

          {/* Existing donations */}
          {donationsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={22} className="animate-spin text-[#1e40af]" />
            </div>
          ) : donations.length > 0 ? (
            <div className="divide-y divide-[#f3f4f6]">
              {donations.map((donation: Donation) => (
                <div key={donation.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Heart size={18} className="text-[#e11d48]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#1e1b4b]">
                      {donation.is_monthly ? 'תרומה חודשית' : 'תרומה חד-פעמית'}
                    </p>
                    {donation.is_monthly && (donation as Donation & { monthly_day?: number }).monthly_day && (
                      <p className="text-[12px] text-[#6b7280]">
                        חיוב בכל חודש ביום {(donation as Donation & { monthly_day?: number }).monthly_day}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[14px] font-bold text-[#e11d48]">
                      {formatILS(donation.amount)}
                      {donation.is_monthly && <span className="text-[11px] font-normal text-[#9ca3af]">/חודש</span>}
                    </span>
                    <button
                      onClick={() => removeDonation(donation.id)}
                      disabled={removingDonation}
                      className="w-7 h-7 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#9ca3af] hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                      title="הסר"
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-5 px-5 text-center text-[13px] text-[#9ca3af]">אין תרומות בסל</div>
          )}

          {/* Add donation form */}
          <div className="px-5 py-5 border-t border-[#f3f4f6] bg-[#F8FAFF]">
            <p className="text-[13px] font-semibold text-[#374151] mb-3">הוסף תרומה</p>
            <form onSubmit={handleAddDonation} className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-[#6b7280] mb-1">סכום (₪)</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={donationAmount}
                  onChange={e => setDonationAmount(e.target.value)}
                  placeholder="50"
                  className="w-full border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] bg-white focus:outline-none focus:border-[#1e40af]"
                  dir="ltr"
                  disabled={addingDonation}
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isMonthly}
                  onChange={e => setIsMonthly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1e40af]"
                  disabled={addingDonation}
                />
                <span className="text-[13px] text-[#374151]">תרומה חודשית קבועה</span>
              </label>

              {isMonthly && (
                <div>
                  <label className="block text-[12px] font-medium text-[#6b7280] mb-1">יום חיוב בחודש (1–28)</label>
                  <input
                    type="number"
                    min={1}
                    max={28}
                    value={monthlyDay}
                    onChange={e => setMonthlyDay(Number(e.target.value))}
                    className="w-24 border border-[#e5e7eb] rounded-xl px-4 py-2.5 text-[14px] text-[#374151] bg-white focus:outline-none focus:border-[#1e40af]"
                    dir="ltr"
                    disabled={addingDonation}
                  />
                </div>
              )}

              {donationError && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-2.5 rounded-xl">
                  {donationError}
                </div>
              )}

              <button
                type="submit"
                disabled={addingDonation || !donationAmount}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1e40af] text-white font-semibold text-[13px] hover:bg-[#1c3a9e] transition-colors disabled:opacity-50"
              >
                {addingDonation ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                {addingDonation ? 'מוסיף...' : 'הוסף תרומה'}
              </button>
            </form>
          </div>
        </div>

        {/* Total + checkout */}
        {!isEmpty && (
          <div className="bg-white rounded-3xl border border-[#e5e7eb] shadow-sm px-6 py-5">
            <div className="space-y-2 mb-4">
              {servicesTotal > 0 && (
                <div className="flex justify-between text-[13px] text-[#6b7280]">
                  <span>שירותים</span>
                  <span>{formatILS(servicesTotal)}</span>
                </div>
              )}
              {donationsTotal > 0 && (
                <div className="flex justify-between text-[13px] text-[#6b7280]">
                  <span>תרומות</span>
                  <span>{formatILS(donationsTotal)}</span>
                </div>
              )}
              <div className="border-t border-[#f3f4f6] pt-2 flex justify-between text-[16px] font-bold text-[#1e1b4b]">
                <span>סה״כ לתשלום</span>
                <span className="text-[#1e40af]">{formatILS(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout button — disabled, coming soon */}
            <div className="relative group">
              <button
                type="button"
                disabled
                className="w-full py-3.5 rounded-2xl bg-[#1e40af] text-white font-bold text-[16px] opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
              >
                המשך לתשלום
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1e1b4b] text-white text-[12px] font-medium px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                בקרוב — תשלום Tranzila יתווסף בקרוב
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
