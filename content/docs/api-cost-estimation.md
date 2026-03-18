---
title: API Cost Estimation — AI Interview Platform
description: Detailed breakdown of API costs, pricing models, and monthly projections for the AI Interview Platform using Gemini 2.0 Flash and Groq.
---

# API Cost Estimation — AI Interview Platform

> **Last Updated:** March 2026  
> **Exchange Rate Used:** 1 USD = ₹92.37 (approximate, March 2026)

---

## Models in Use

| Feature | Model | Provider |
|---|---|---|
| Live Interview (questions + feedback) | **Gemini 2.0 Flash** | Google AI |
| Resume Enhancement (rebuild) | **Gemini 2.0 Flash** | Google AI |
| Resume CV Scoring / Evaluation | **Llama 3.1 8B Instant** | Groq |
| Resume Improvement Suggestions | **Llama 3.1 8B Instant** | Groq|

---

## Gemini 2.0 Flash Pricing (Official)

| Token Type | Price (USD) | Price (INR approx.) |
|---|---|---|
| Input tokens | $0.10 / 1M tokens | ₹9.24 / 1M tokens |
| Output tokens | $0.40 / 1M tokens | ₹36.95 / 1M tokens |

> Source: Google AI Studio pricing page (as of early 2026). Free tier: 15 RPM / 1M tokens/day.

---

## Groq (Llama 3.1 8B Instant) Pricing

| Token Type | Price (USD) |
|---|---|
| Input tokens | $0.05 / 1M tokens |
| Output tokens | $0.08 / 1M tokens |

> Groq is **~5–8x cheaper** than Gemini Flash. Used only for CV scoring, not the interview itself.

---

## Token Breakdown Per Operation

### 1. Live Interview Session (Gemini 2.0 Flash)

A full interview session has 4 phases. The key cost driver is that **conversation history is passed cumulatively on every turn** — so input tokens grow roughly quadratically with length.

| Phase | API Call | Tokens | Notes |
|---|---|---|---|
| **Init** | `summarize_context` | ~2,000 in / ~600 out | Fixed cost per session |
| **Per Turn** | `generate_question` | 1,500 + (turn# × 400) in / ~300 out | History grows each turn |
| **Mid Session** | `mid_interview_snapshot` | ~2,500 in / ~400 out | Fixed, one call |
| **End** | `generate_feedback` | 3,000 + (turns × 400) in / ~2,000 out | Full history for report |

**Token formula:**
```
Turns input total  = 1,500 × N + 200 × N × (N-1)   [N = number of turns]
Feedback input     = 3,000 + 400 × N
Fixed overhead     = 2,000 (summarize) + 2,500 (snapshot)
```

#### Per-Duration Cost Breakdown

| Duration | Est. Turns | Input Tokens | Output Tokens | Cost (USD) | Cost (INR) |
|---|---|---|---|---|---|
| **15 min** | ~4  | ~17,500 | ~4,200 | $0.00343 | **~₹0.32** |
| **30 min** | ~8  | ~33,900 | ~5,400 | $0.00555 | **~₹0.51** |
| **45 min** | ~12 | ~56,700 | ~6,600 | $0.00831 | **~₹0.77** |
| **60 min** | ~16 | ~85,900 | ~7,800 | $0.01171 | **~₹1.08** |

> A 60-min session costs ~3.4× more than a 15-min session (not 4×) because the fixed init/feedback overhead is shared.

---

### 2. Resume Upload & Analysis

A resume upload triggers **two separate model calls**:

#### A. CV Scoring (Groq — Llama 3.1 8B)

| Call | Est. Input Tokens | Est. Output Tokens |
|---|---|---|
| `unified_evaluate` (CV quality + JD match) | ~3,500 | ~800 |
| `improvement` suggestions | ~3,000 | ~1,000 |
| **Total** | **~6,500** | **~1,800** |

```
Input  cost = (6,500  / 1,000,000) × $0.05 = $0.000325
Output cost = (1,800  / 1,000,000) × $0.08 = $0.000144
────────────────────────────────────────────────────────
CV Scoring cost per resume ≈ $0.00047  (~₹0.04)
```

#### B. Resume Enhancement / Rebuild (Gemini 2.0 Flash)

The enhance_resume call sends the raw resume text + analysis JSON + full schema prompt:

| | Input Tokens | Output Tokens|
|---|---|---|
| `enhance_resume` (1×) | ~5,500 | ~3,500 |

```
Input  cost = (5,500 / 1,000,000) × $0.10 = $0.00055
Output cost = (3,500 / 1,000,000) × $0.40 = $0.00140
───────────────────────────────────────────────────────
Resume enhancement cost ≈ $0.00195  (~₹0.18)
```

**Total cost per full resume upload (scoring + enhancement):**

```
₹0.04 + ₹0.18 ≈ ₹0.22  ($0.00242)
```

---

## Your Subscription Tiers vs. Actual Cost

### Cost Per Interview by Duration

| Duration | Cost per Interview | Resume Cost | Notes |
|---|---|---|---|
| 15 min | ₹0.32 | ₹0.22 | Best case — short session |
| 30 min | ₹0.51 | ₹0.22 | Typical default |
| 45 min | ₹0.77 | ₹0.22 | Longer sessions |
| 60 min | ₹1.08 | ₹0.22 | Maximum / worst case |

---

### ₹99 Plan — 10 Interviews + 15 Resumes

| Duration Mix | Interview Cost | Resume Cost | Total AI Cost | Revenue | **Margin** |
|---|---|---|---|---|---|
| All 15-min | 10 × ₹0.32 = ₹3.20 | 15 × ₹0.22 = ₹3.30 | ₹6.50 | ₹99 | **₹92.50 (93%)** |
| All 30-min | 10 × ₹0.51 = ₹5.10 | 15 × ₹0.22 = ₹3.30 | ₹8.40 | ₹99 | **₹90.60 (91%)** |
| All 45-min | 10 × ₹0.77 = ₹7.70 | 15 × ₹0.22 = ₹3.30 | ₹11.00 | ₹99 | **₹88.00 (89%)** |
| All 60-min | 10 × ₹1.08 = ₹10.80| 15 × ₹0.22 = ₹3.30 | ₹14.10 | ₹99 | **₹84.90 (86%)** |

---

### ₹199 Plan — 20 Interviews + 40 Resumes

| Duration Mix | Interview Cost | Resume Cost | Total AI Cost | Revenue | **Margin** |
|---|---|---|---|---|---|
| All 15-min | 20 × ₹0.32 = ₹6.40 | 40 × ₹0.22 = ₹8.80 | ₹15.20 | ₹199 | **₹183.80 (92%)** |
| All 30-min | 20 × ₹0.51 = ₹10.20| 40 × ₹0.22 = ₹8.80 | ₹19.00 | ₹199 | **₹180.00 (90%)** |
| All 45-min | 20 × ₹0.77 = ₹15.40| 40 × ₹0.22 = ₹8.80 | ₹24.20 | ₹199 | **₹174.80 (88%)** |
| All 60-min | 20 × ₹1.08 = ₹21.60| 40 × ₹0.22 = ₹8.80 | ₹30.40 | ₹199 | **₹168.60 (85%)** |

> **Even if every single user runs every interview at 60 minutes and uploads all resumes, margins stay above 85%.** In practice users will be mixed across durations, so real margins will be closer to 88-90%.

---

## 🇺🇸 US Tier Plans vs. Actual Cost

Pricing for users in the United States offers significantly higher profit multipliers due to the conversion scale, while API computing burden remains identical worldwide.

### $5 Plan (Small) — ~₹461.85 
*Assuming allowances matching the ₹99 Plan (10 Interviews + 15 Resumes)*

| Duration Mix | Total AI Cost Max | Revenue (INR) | **Margin** | Margin % |
|---|---|---|---|---|
| All 15-min | ₹6.50 | ₹461.85 | **₹455.35** | **98.5%** |
| All 30-min | ₹8.40 | ₹461.85 | **₹453.45** | **98.1%** |
| All 45-min | ₹11.00 | ₹461.85 | **₹450.85** | **97.6%** |
| All 60-min | ₹14.10 | ₹461.85 | **₹447.75** | **96.9%** |

---

### $9 Plan (Big) — ~₹831.33 
*Assuming allowances matching the ₹199 Plan (20 Interviews + 40 Resumes)*

| Duration Mix | Total AI Cost Max | Revenue (INR) | **Margin** | Margin % |
|---|---|---|---|---|
| All 15-min | ₹15.20 | ₹831.33 | **₹816.13** | **98.1%** |
| All 30-min | ₹19.00 | ₹831.33 | **₹812.33** | **97.7%** |
| All 45-min | ₹24.20 | ₹831.33 | **₹807.13** | **97.0%** |
| All 60-min | ₹30.40 | ₹831.33 | **₹800.93** | **96.3%** |

> **Key Takeaway:** US clients create extreme yield leverage. Even fully exhausted accounts clear margins starting at **96%+**, making target advertising inside Western markets incredibly lucrative to build strong income thresholds.

---

## 🆓 Free Tier Offering & Maximum Loss

To attract initial users, the platform offers a **Free Tier** with limits of:
- **3 Interviews** (Max 15 minutes each)
- **5 Resume Uploads** (Score + Enhancement)

### Maximum API Cost Breakdown (Loss per User)

Assuming a single user fully consumes their free allowance:

| Activity | Allowance | Cost per Unit | Total Cost |
|---|---|---|---|
| **Interviews (15 min)** | 3 | ₹0.32 | ₹0.96 |
| **Resume Uploads** | 5 | ₹0.22 | ₹1.10 |
| **Total Maximum Cost** | — | — | **₹2.06** |

> **Key Takeaway:** The absolute maximum API cost for giving away free access to **one user** is **~₹2.06**. 
> - 100 fully active free users cost **₹206**.
> - 1,000 fully active free users cost **₹2,060**.
> This risk is negligible, making it highly feasible to drive early traction through generous free triggers.

---

## Monthly Cumulative (100 Paying Users)

Assuming a 50/50 split between plans:

| Plan | Users | Revenue | AI Cost |
|---|---|---|---|
| ₹99 | 50 | ₹4,950 | ₹450 |
| ₹199 | 50 | ₹9,950 | ₹1,000 |
| **Total** | **100** | **₹14,900** | **₹1,450** |

**Monthly AI cost for 100 users = ~₹1,450 (~$15.7 USD)**

---

## 🛠️ Fixed Overhead (Server & Domain Costs)

While **API costs scale directly with usage**, Server and Domain are **Fixed Costs** that remain flat regardless of whether you have 10 or 1,000 active users.

### Real-World Fixed Cost Estimations (`aiforjob.ai`)

| Item | Service Tier | Annual Cost (INR) | Cost (INR / Month) | Notes |
|---|---|---|---|---|
| **Domain Name** | `.ai` Extension | **₹16,000 / year** | **₹1,333** | Annual renewal calculated monthly |
| **Server Operations** | Google Cloud (GCP) | — | **~₹2,771** | Calculated at $30/mo x 92.37 scale |

---

### 📊 Total Operating P&L Scenario (100 Paying Users)

Adding the absolute actual operating overheads to our Scaling API breakdown:

| Item | Calculation | Note |
|---|---|---|
| **Gross Revenue** | **+₹14,900** | 100 users (mixed tiers) |
| **API Costs** | -₹1,450 | Variable overhead (scales with user triggers) |
| **Domain Cost** | -₹1,333 | Fixed flat overhead |
| **Server Ops (GCP)** | -₹2,771 | Fixed flat overhead |
| **Total Net Income** | **₹9,346 / month** | Net Profit |

> **Bottom Line:** Even utilizing heavier infrastructure tiers with high `.ai` flat rates, absolute profit remains secure with a fully healthy **~62.7% profit margin** at 100 users. 
> Since fixed costs remain flat, as you scale higher (e.g. to 200+ users), your profit percentage margins will climb even higher!

---

## Google AI Free Tier (Important for Early Stage)

Gemini 2.0 Flash has a **free tier**:

| Limit | Value |
|---|---|
| Requests per minute | 15 RPM |
| Tokens per day | 1,000,000 (1M) |
| Tokens per minute | 1,000,000 |

At ~44,000 tokens per interview session (input + output), the free tier supports approximately **22 full interviews per day** at zero cost — sufficient for testing and early beta users before monetisation kicks in.

---

## Summary Table

| Operation | Input Tokens | Output Tokens | Cost (INR) |
|---|---|---|---|
| Interview — 15 min (4 turns) | ~17,500 | ~4,200 | **~₹0.32** |
| Interview — 30 min (8 turns) | ~33,900 | ~5,400 | **~₹0.51** |
| Interview — 45 min (12 turns) | ~56,700 | ~6,600 | **~₹0.77** |
| Interview — 60 min (16 turns) | ~85,900 | ~7,800 | **~₹1.08** |
| Resume Upload (score + enhance) | ~12,000 | ~5,300 | **~₹0.22** |
| ₹99 Plan — all 30-min interviews | — | — | **₹8.40 cost / ₹90.60 margin** |
| ₹99 Plan — all 60-min interviews | — | — | **₹14.10 cost / ₹84.90 margin** |
| ₹199 Plan — all 30-min interviews | — | — | **₹19.00 cost / ₹180.00 margin** |
| ₹199 Plan — all 60-min interviews | — | — | **₹30.40 cost / ₹168.60 margin** |

---

## Key Takeaways

1. **AI costs are extremely low** — even if all users pick 60-min interviews, the ₹99 plan costs only ₹14.10 in API calls (~14% cost ratio).
2. **Groq (CV scoring) is nearly free** — adds about ₹0.04 per resume; the ₹0.22 resume cost is almost entirely the Gemini enhancement call.
3. **The real cost driver is interview duration** — a 60-min session costs ~3.4× more than a 15-min session. Consider assigning shorter durations (15–30 min) to the ₹99 plan and unlocking 45–60 min for ₹199.
4. **Free tier covers early growth** — Gemini 2.0 Flash free tier (1M tokens/day) supports ~18 full 60-min interviews or ~57 short 15-min sessions per day at zero cost.
5. **Margins hold at 85-93% across all durations** — you have extreme headroom; API costs will not be a concern even at 100× user growth.
