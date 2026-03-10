const axios = require('axios');

const BASE    = 'http://localhost:5000/api';
const ROOT    = 'http://localhost:5000';
const GREEN   = '\x1b[32m';
const RED     = '\x1b[31m';
const YELLOW  = '\x1b[33m';
const RESET   = '\x1b[0m';
const BOLD    = '\x1b[1m';

const pass = (name, ms) =>
  console.log(`  ${GREEN}✅ PASS${RESET} ${name} ${YELLOW}(${ms}ms)${RESET}`);

const fail = (name, err) =>
  console.log(`  ${RED}❌ FAIL${RESET} ${name} — ${err}`);

const tests = [
  {
    name:  'Server Health Check',
    fn:    () => axios.get(ROOT),
    check: (d) => d.data.message.includes('ResQ-AI'),
  },
  {
    name:  'Admin Stats',
    fn:    () => axios.get(`${BASE}/admin/stats`),
    check: (d) => d.data.success === true && typeof d.data.stats === 'object',
  },
  {
    name:  'Waste Analytics',
    fn:    () => axios.get(`${BASE}/admin/waste-analytics`),
    check: (d) => d.data.success === true,
  },
  {
    name:  'Community Feed',
    fn:    () => axios.get(`${BASE}/community/feed`),
    check: (d) => Array.isArray(d.data.posts),
  },
  {
    name:  'Rider Leaderboard',
    fn:    () => axios.get(`${BASE}/rider/leaderboard`),
    check: (d) => Array.isArray(d.data.leaderboard),
  },
  {
    name:  'Rescue Feed',
    fn:    () => axios.get(`${BASE}/rider/feed`),
    check: (d) => Array.isArray(d.data.donations),
  },
  {
    name:  'NGO List',
    fn:    () => axios.get(`${BASE}/ngos`),
    check: (d) => Array.isArray(d.data.ngos),
  },
  {
    name:  'All Donations',
    fn:    () => axios.get(`${BASE}/donate`),
    check: (d) => Array.isArray(d.data.donations),
  },
  {
    name:  'Active Logistics',
    fn:    () => axios.get(`${BASE}/logistics/active`),
    check: (d) => d.data.success === true,
  },
  {
    name:  'Donation Verify (POST)',
    fn:    () => axios.post(`${BASE}/donate/verify`, {
      donorName:       'API Test Donor',
      donorType:       'restaurant',
      foodItems:       [{ name: 'Rice', quantity: 5, unit: 'kg' }],
      preparationTime: 1,
      temperature:     'hot',
      smell:           'normal',
      packing:         'sealed',
      location:        { address: 'Test Location', lat: 12.97, lng: 77.59 },
      kgFood:          5,
    }),
    check: (d) => typeof d.data.riskScore === 'number' && d.data.riskScore > 0,
  },
  {
    name:  'Surplus Prediction (POST)',
    fn:    () => axios.post(`${BASE}/corporate/predict-surplus`, {
      companyName:           'API Test Corp',
      dailyMealSchedule:     [{ meal: 'Lunch', quantity: 300, time: '1 PM' }],
      historicalWastePercent: 20,
    }),
    check: (d) => d.data.success === true,
  },
  {
    name:  'NGO Urgency Match (POST)',
    fn:    () => axios.post(`${BASE}/ngos/match-demand`, {
      ngoName:        'API Test NGO',
      mealsRequired:  50,
      foodPreference: ['rice'],
      urgency:        'medium',
    }),
    check: (d) => d.data.success === true,
  },
  {
    name:  'Community Post (POST)',
    fn:    () => axios.post(`${BASE}/community/post`, {
      authorName: 'API Test User',
      authorRole: 'community',
      postType:   'general',
      content:    'Test post from API test suite',
    }),
    check: (d) => d.data.success === true && d.data.post._id,
  },
  {
    name:  'Shelf Life AI (POST)',
    fn:    () => axios.post(`${BASE}/ai/shelf-life`, {
      foodItems:       [{ name: 'Rice' }],
      preparationTime: 2,
      temperature:     'hot',
      packing:         'sealed',
    }),
    check: (d) => d.data.success === true && d.data.shelfLife,
  },
];

const runTests = async () => {
  console.log('');
  console.log(`${BOLD}🧪 ResQ-AI API Test Suite${RESET}`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`   Base URL: ${BASE}`);
  console.log(`   Tests:    ${tests.length}`);
  console.log(`${'═'.repeat(50)}`);
  console.log('');

  let passed = 0;
  let failed  = 0;
  const start = Date.now();

  for (const test of tests) {
    const t0 = Date.now();
    try {
      const result = await test.fn();
      const ms     = Date.now() - t0;
      if (test.check(result)) {
        pass(test.name, ms);
        passed++;
      } else {
        fail(test.name, 'Unexpected response shape');
        failed++;
      }
    } catch (err) {
      fail(test.name, err.response?.data?.message || err.message);
      failed++;
    }
  }

  const duration = Date.now() - start;

  console.log('');
  console.log(`${'═'.repeat(50)}`);
  console.log(
    `  ${BOLD}Results:${RESET}  ` +
    `${GREEN}${passed} passed${RESET}  ` +
    `${failed > 0 ? RED : GREEN}${failed} failed${RESET}  ` +
    `${YELLOW}(${duration}ms total)${RESET}`
  );
  console.log(`${'═'.repeat(50)}`);

  if (failed === 0) {
    console.log(`\n  ${GREEN}${BOLD}🎉 All tests passed! ResQ-AI is fully operational.${RESET}\n`);
  } else {
    console.log(`\n  ${RED}⚠️  ${failed} test(s) failed. Check server logs.${RESET}\n`);
    process.exit(1);
  }
};

runTests().catch((err) => {
  console.error('Test runner crashed:', err.message);
  process.exit(1);
});