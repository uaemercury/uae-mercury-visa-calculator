// UAE Mercury — Visa Expiry Calculator. Everything runs locally; no data is collected or sent anywhere.
document.getElementById('go').addEventListener('click', function () {
  var expVal = document.getElementById('expiry').value;
  var grace = parseInt(document.getElementById('grace').value || '0', 10);
  var box = document.getElementById('result');
  if (!expVal) { box.style.display = 'block'; box.innerHTML = 'Please select your visa expiry date.'; return; }
  var expiry = new Date(expVal + 'T23:59:59');
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var graceEnd = new Date(expiry); graceEnd.setDate(graceEnd.getDate() + grace);
  var dayMs = 86400000;
  var fmt = function (d) { return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
  var html = '';
  if (today <= expiry) {
    var left = Math.ceil((expiry - today) / dayMs);
    html = 'Your visa is valid for <b>' + left + ' more day' + (left === 1 ? '' : 's') + '</b> (expires ' + fmt(expiry) + ').';
    if (grace > 0) html += '<br>With a ' + grace + '-day grace period, you must exit or renew by <b>' + fmt(graceEnd) + '</b>.';
  } else if (today <= graceEnd) {
    var gLeft = Math.ceil((graceEnd - today) / dayMs);
    html = '<span class="warn">Your visa expired on ' + fmt(expiry) + '</span> — you are in your grace period with <b>' + gLeft + ' day' + (gLeft === 1 ? '' : 's') + '</b> left (until ' + fmt(graceEnd) + '). Exit or renew before then.';
  } else {
    var over = Math.floor((today - graceEnd) / dayMs);
    var fine = over * 50; // UAE standard overstay fine: AED 50 per day (estimate)
    html = '<span class="warn">You are overstaying by about ' + over + ' day' + (over === 1 ? '' : 's') + '.</span><br>Estimated fine: <b>AED ' + fine.toLocaleString() + '</b> (AED 50/day standard rate). Read the overstay fine guide below for how to pay and regularise your status.';
  }
  box.style.display = 'block';
  box.innerHTML = html;
});
