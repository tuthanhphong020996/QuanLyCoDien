tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Inter"', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f0fdf5',
                            100: '#dcfce7',
                            200: '#b9f6ca',
                            500: '#05985C',
                            600: '#047d4c',
                            700: '#03633c',
                            800: '#024f2a'
                        }
                    }
                }
            }
        }

// --- 1. STATE & DỮ LIỆU KHỞI TẠO (GIỮ THEO BLASOR HOẶC RANDOM) ---
    const currentUser = { id: 1, userCode: 'NV001', fullName: 'Nguyễn Văn A' };
    let activeTab = 1;

    // Danh sách phân xưởng
    const comps = [
        { id: 1, name: 'Nệm' },
        { id: 2, name: 'Gỗ 1' },
        { id: 3, name: 'Gỗ 2' },
        { id: 20, name: 'Sắt' }
    ];

    // Danh sách Người dùng
    const users = [
        { id: 1, fullName: 'Nguyễn Văn A' },
        { id: 2, fullName: 'Trần Văn Bình' },
        { id: 3, fullName: 'Lê Hoàng Nam' }
    ];

    // Checklist mẫu
    let checkListHs = [
        { id: 101, checklistName: 'Checklist máy nén khí', deviceIDs: [1, 2] },
        { id: 102, checklistName: 'Checklist trạm bơm nước', deviceIDs: [3] },
        { id: 103, checklistName: 'Checklist tủ điện & trạm nguồn', deviceIDs: [5, 6] },
        { id: 104, checklistName: 'Checklist máy ép thủy lực', deviceIDs: [4] }
    ];

    let checkListDs = [
        { id: 1, checklistHID: 101, itemCode: 'TC01', itemName: 'Kiểm tra mức dầu bôi trơn', checkType: 'PASS/FAIL' },
        { id: 2, checklistHID: 101, itemCode: 'TC02', itemName: 'Áp lực khí nén đạt 7-8 bar', checkType: 'PASS/FAIL' },
        { id: 3, checklistHID: 101, itemCode: 'TC03', itemName: 'Kiểm tra tiếng ồn bất thường', checkType: 'PASS/FAIL' },
        { id: 4, checklistHID: 102, itemCode: 'TC04', itemName: 'Nhiệt độ motor bơm < 75°C', checkType: 'PASS/FAIL' },
        { id: 5, checklistHID: 102, itemCode: 'TC05', itemName: 'Kiểm tra rò rỉ khớp nối ống', checkType: 'PASS/FAIL' },
        { id: 6, checklistHID: 103, itemCode: 'TC06', itemName: 'Điện áp 3 pha cân bằng 380V', checkType: 'PASS/FAIL' },
        { id: 7, checklistHID: 103, itemCode: 'TC07', itemName: 'Đèn báo pha & rơ-le hoạt động tốt', checkType: 'PASS/FAIL' },
        { id: 8, checklistHID: 104, itemCode: 'TC08', itemName: 'Áp suất thủy lực đủ tải', checkType: 'PASS/FAIL' }
    ];

    // Thiết bị
    let devices = [
        { id: 1, deviceCode: 'M-01', deviceName: 'Máy nén khí trục vít #1', compID: 2, compName: 'Gỗ 1' },
        { id: 2, deviceCode: 'M-02', deviceName: 'Máy nén khí trục vít #2', compID: 1, compName: 'Nệm' },
        { id: 3, deviceCode: 'P-01', deviceName: 'Bơm nước làm mát xưởng', compID: 2, compName: 'Gỗ 1' },
        { id: 4, deviceCode: 'MC-01', deviceName: 'Máy ép thủy lực 50T', compID: 1, compName: 'Nệm' },
        { id: 5, deviceCode: 'DB-02', deviceName: 'Tủ điện phân phối Chuyền 2', compID: 3, compName: 'Gỗ 2' },
        { id: 6, deviceCode: 'GEN-01', deviceName: 'Máy phát điện dự phòng 250kVA', compID: 20, compName: 'Sắt' }
    ];

    // Lịch sử kiểm tra (H & D)
    let listInspectionH = [
        { id: 1, deviceID: 1, inspectionDate: '2026-10-20T08:30:00', status: 'PASS', createdBy: 'Nguyễn Văn A', issueDescription: 'Mọi thứ chuẩn' },
        { id: 2, deviceID: 2, inspectionDate: '2026-10-20T09:15:00', status: 'FAIL', createdBy: 'Nguyễn Văn A', issueDescription: 'Nhiệt độ nhớt cao' }
    ];

    let listInspectionD = [
        { inspectionHID: 1, checklistDID: 1, itemName: 'Kiểm tra mức dầu bôi trơn', checkResult: 'PASS', issueDescription: '' },
        { inspectionHID: 1, checklistDID: 2, itemName: 'Áp lực khí nén đạt 7-8 bar', checkResult: 'PASS', issueDescription: '' },
        { inspectionHID: 1, checklistDID: 3, itemName: 'Kiểm tra tiếng ồn bất thường', checkResult: 'PASS', issueDescription: '' },
        { inspectionHID: 2, checklistDID: 1, itemName: 'Kiểm tra mức dầu bôi trơn', checkResult: 'FAIL', issueDescription: 'Hao hụt dầu nghiêm trọng' },
        { inspectionHID: 2, checklistDID: 2, itemName: 'Áp lực khí nén đạt 7-8 bar', checkResult: 'PASS', issueDescription: '' },
        { inspectionHID: 2, checklistDID: 3, itemName: 'Kiểm tra tiếng ồn bất thường', checkResult: 'PASS', issueDescription: '' }
    ];

    // Kế hoạch phân bổ (Plan)
    let planDs = [
        { id: 1, deviceID: 1, checklistHID: 101, assignedUserID: 1, assignedUserName: 'Nguyễn Văn A', status: 'PENDING', process: '0/0', isShowInspectionHistory: false, showInspectionCount: 0 },
        { id: 2, deviceID: 2, checklistHID: 101, assignedUserID: 1, assignedUserName: 'Nguyễn Văn A', status: 'PENDING', process: '0/0', isShowInspectionHistory: false, showInspectionCount: 0 },
        { id: 3, deviceID: 3, checklistHID: 102, assignedUserID: 2, assignedUserName: 'Trần Văn Bình', status: 'PENDING', process: '0/0', isShowInspectionHistory: false, showInspectionCount: 0 },
        { id: 4, deviceID: 4, checklistHID: 104, assignedUserID: 0, assignedUserName: '', status: 'PENDING', process: '0/0', isShowInspectionHistory: false, showInspectionCount: 0 },
        { id: 5, deviceID: 5, checklistHID: 103, assignedUserID: 3, assignedUserName: 'Lê Hoàng Nam', status: 'PENDING', process: '0/0', isShowInspectionHistory: false, showInspectionCount: 0 },
        { id: 6, deviceID: 6, checklistHID: 103, assignedUserID: 0, assignedUserName: '', status: 'PENDING', process: '0/0', isShowInspectionHistory: false, showInspectionCount: 0 }
    ];

    // Danh sách Báo cáo
    let listDeviceReport = [
        { id: 1, deviceCode: 'M-01', deviceName: 'Máy nén khí trục vít #1', compID: 2, compName: 'Gỗ 1', statusCode: 'good', statusName: 'Chạy tốt', statusDescription: 'Áp lực 7.2 bar ổn định' },
        { id: 2, deviceCode: 'M-02', deviceName: 'Máy nén khí trục vít #2', compID: 1, compName: 'Nệm', statusCode: 'error', statusName: 'Đang lỗi', statusDescription: 'Báo quá nhiệt (98°C), đang kiểm tra két làm mát' },
        { id: 3, deviceCode: 'P-01', deviceName: 'Bơm nước làm mát xưởng', compID: 2, compName: 'Gỗ 1', statusCode: 'good', statusName: 'Chạy tốt', statusDescription: 'Áp lực bình thường' },
        { id: 4, deviceCode: 'MC-01', deviceName: 'Máy ép thủy lực 50T', compID: 1, compName: 'Nệm', statusCode: 'maintenance', statusName: 'Bảo dưỡng', statusDescription: 'Thay dầu nhớt & phớt xilanh định kỳ' },
        { id: 5, deviceCode: 'DB-02', deviceName: 'Tủ điện phân phối Chuyền 2', compID: 3, compName: 'Gỗ 2', statusCode: 'error', statusName: 'Đang lỗi', statusDescription: 'Hỏng khởi động từ 18A, đang chờ thay linh kiện' },
        { id: 6, deviceCode: 'GEN-01', deviceName: 'Máy phát điện dự phòng 250kVA', compID: 20, compName: 'Sắt', statusCode: 'good', statusName: 'Chạy tốt', statusDescription: 'Chế độ Auto sẵn sàng, dầu còn 80%' }
    ];

    // State bộ lọc Tab 1
    let filterDate = new Date().toISOString().split('T')[0];
    let filterComp = 'ALL';
    let filterStatus = 'ALL';
    let docTypeAssign = 'assignall';
    let filterSearch = '';

    // State bộ lọc Tab 4
    let statusFilterDeviceOnReport = 'ALL';
    let compFilterDeviceOnReport = 'ALL';
    let searchFilterDeviceOnReport = '';

    // State thao tác Modal Inspection
    let currentInpModalHeader = {};
    let currentInpModalDetails = [];

    // State Modal History
    let currentHistoryHeaders = [];
    let selectedHistoryHeader = null;

    // --- 2. HÀM ĐỒNG BỘ VÀ KHỞI TẠO (INIT) ---
    function init() {
        document.getElementById('filter-date').value = filterDate;
        updatePlanCalculations();
        renderPlanTab();
        renderEquipmentTab();
        renderReportTab();
    }

    // Cập nhật thống kê kế hoạch
    function updatePlanCalculations() {
        planDs.forEach(p => {
            const dev = devices.find(d => d.id === p.deviceID);
            p.deviceCode = dev ? dev.deviceCode : '';
            p.deviceName = dev ? dev.deviceName : '';
            p.compName = dev ? dev.compName : '';

            // Lấy lần kiểm tra mới nhất
            const inps = listInspectionH.filter(h => h.deviceID === p.deviceID).sort((a,b) => new Date(b.inspectionDate) - new Date(a.inspectionDate));
            if (inps.length > 0) {
                const latest = inps[0];
                p.status = latest.status;
                const details = listInspectionD.filter(d => d.inspectionHID === latest.id);
                const passCount = details.filter(d => d.checkResult === 'PASS').length;
                const failCount = details.filter(d => d.checkResult === 'FAIL').length;
                p.process = `${passCount}/${details.length} pass - ${failCount}/${details.length} fail`;
                p.isShowInspectionHistory = true;
                p.showInspectionCount = inps.length;
            } else {
                p.process = 'Chưa kiểm';
            }
        });

        // Cập nhật card chỉ số Tab 1
        const total = planDs.length;
        const inspected = planDs.filter(p => p.status === 'PASS' || p.status === 'FAIL').length;
        const pass = planDs.filter(p => p.status === 'PASS').length;
        const fail = planDs.filter(p => p.status === 'FAIL').length;
        const remain = total - inspected;
        const pct = total > 0 ? Math.round((inspected / total) * 100) : 0;

        document.getElementById('stat-total-tasks').innerText = total;
        document.getElementById('stat-inspected-equipments').innerText = `${inspected}/${total}`;
        document.getElementById('stat-inspect-percent').innerText = `${pct}%`;
        document.getElementById('stat-remain-equipments').innerText = remain;
        document.getElementById('stat-normal-equipments').innerText = pass;
        document.getElementById('stat-issue-equipments').innerText = fail;
        document.getElementById('plan-badge-count').innerText = remain;
        document.getElementById('eq-badge-count').innerText = devices.length;
    }

    // --- 3. TAB NAVIGATION ---
    function switchTab(tab) {
        activeTab = tab;
        document.getElementById('tab-1-content').classList.toggle('hidden', tab !== 1);
        document.getElementById('tab-2-content').classList.toggle('hidden', tab !== 2);
        document.getElementById('tab-4-content').classList.toggle('hidden', tab !== 4);

        // Nút active class
        const btn1 = document.getElementById('nav-btn-tasks');
        const btn2 = document.getElementById('nav-btn-equipments');
        const btn4 = document.getElementById('nav-btn-reports');

        btn1.className = `p-1.5 rounded-lg font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${tab === 1 ? 'bg-brand-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`;
        btn2.className = `p-1.5 rounded-lg font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${tab === 2 ? 'bg-brand-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`;
        btn4.className = `group relative flex items-center justify-center gap-1 p-1.5 rounded-md font-medium ${tab === 4 ? 'bg-amber-100 text-amber-900 font-bold' : 'text-amber-700 hover:text-amber-800 hover:bg-amber-100/60'} border border-transparent hover:border-amber-200 transition-all text-sm w-full`;

        if (tab === 2) renderEquipmentTab();
        if (tab === 4) renderReportTab();
    }

    // --- 4. TAB 1: KẾ HOẠCH & FILTER ---
    function filterPlan(type, value) {
        if (type === 'assign' || type === 'unassign' || type === 'assignall') docTypeAssign = type;
        if (type === 'date') filterDate = value;
        if (type === 'comp') filterComp = value;
        if (type === 'status') filterStatus = value;
        if (type === 'search') filterSearch = value.toLowerCase();

        // Cập nhật UI nút quick filter
        document.getElementById('quick-filter-all').className = `px-2 py-1 rounded font-semibold ${docTypeAssign === 'assignall' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`;
        document.getElementById('quick-filter-mine').className = `px-2 py-1 rounded font-semibold ${docTypeAssign === 'assign' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`;
        document.getElementById('quick-filter-unassigned').className = `px-2 py-1 rounded font-semibold ${docTypeAssign === 'unassign' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`;

        renderPlanTab();
    }

    function getFilteredPlans() {
        return planDs.filter(p => {
            if (docTypeAssign === 'assign' && p.assignedUserName !== currentUser.fullName) return false;
            if (docTypeAssign === 'unassign' && p.assignedUserID !== 0) return false;
            if (filterComp !== 'ALL' && p.compName !== filterComp) return false;
            if (filterStatus !== 'ALL' && p.status !== filterStatus) return false;
            if (filterSearch) {
                const s = `${p.deviceCode} ${p.deviceName} ${p.compName}`.toLowerCase();
                if (!s.includes(filterSearch)) return false;
            }
            return true;
        });
    }

    function renderPlanTab() {
        const filtered = getFilteredPlans();
        const mobileContainer = document.getElementById('task-mobile-list');
        const desktopBody = document.getElementById('task-table-body');

        // Render Mobile
        mobileContainer.innerHTML = filtered.map((plan, index) => `
            <div class="rounded-xl border border-slate-200/90 shadow-2xs p-2.5 space-y-1.5 bg-white">
                <div class="flex items-start justify-between gap-2">
                    <div>
                        <div class="font-bold text-sm text-slate-800">${index + 1}. ${plan.deviceCode} - ${plan.deviceName}</div>
                        <div class="text-slate-500 text-xs mt-0.5">📍 ${plan.compName}</div>
                    </div>
                    <div>
                        ${getStatusBadge(plan.status)}
                    </div>
                </div>
                <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <div class="flex items-center gap-1">
                        <span class="text-slate-500">Người kiểm:</span>
                        ${plan.assignedUserID === 0
                            ? `<button onclick="claimTask(${plan.id})" class="text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">Nhận việc +</button>`
                            : `<strong class="text-slate-800">${plan.assignedUserName}</strong>`}
                    </div>
                    <div class="font-medium text-slate-600">${plan.process}</div>
                </div>
                <div class="flex items-center justify-end gap-1.5 pt-1">
                    ${plan.isShowInspectionHistory ? `
                        <button onclick="openInspectionHistoryModal(${plan.deviceID})" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs">
                            Xem lịch sử (${plan.showInspectionCount})
                        </button>
                    ` : ''}
                    <button onclick="openInspectionModalFromPlan(${plan.id})" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs">
                        ${plan.isShowInspectionHistory ? 'Kiểm tra lại' : 'Kiểm Tra'}
                    </button>
                </div>
            </div>
        `).join('');

        // Render Desktop Table
        desktopBody.innerHTML = filtered.map((plan, index) => {
            const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';
            return `
                <tr class="${rowBg} hover:bg-slate-100/60 border-b border-slate-100 transition">
                    <td class="py-2.5 px-3">
                        <strong class="block text-slate-900">${index + 1}. ${plan.deviceCode} - ${plan.deviceName}</strong>
                        <span class="text-slate-500 text-xs">📍 ${plan.compName}</span>
                    </td>
                    <td class="py-2.5 px-3">
                        ${plan.assignedUserID === 0
                            ? `<button onclick="claimTask(${plan.id})" class="text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold text-xs">Nhận việc +</button>`
                            : `<span class="text-slate-800 font-medium text-xs">${plan.assignedUserName}</span>`}
                    </td>
                    <td class="py-2.5 px-3 text-xs text-slate-600 font-medium">${plan.process}</td>
                    <td class="py-2.5 px-3 text-center">${getStatusBadge(plan.status)}</td>
                    <td class="py-2.5 px-3 text-right space-x-1">
                        ${plan.isShowInspectionHistory ? `
                            <button onclick="openInspectionHistoryModal(${plan.deviceID})" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs">
                                Xem lịch sử (${plan.showInspectionCount})
                            </button>
                        ` : ''}
                        <button onclick="openInspectionModalFromPlan(${plan.id})" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs">
                            Kiểm Tra
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function getStatusBadge(status) {
        if (status === 'PASS') return `<span class="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">✅ Đạt</span>`;
        if (status === 'FAIL') return `<span class="px-2 py-0.5 rounded font-bold text-[11px] bg-red-50 text-red-700 border border-red-200">FAIL</span>`;
        return `<span class="px-2 py-0.5 rounded font-medium text-[11px] bg-slate-100 text-slate-600">Chờ kiểm</span>`;
    }

    function claimTask(planId) {
        const plan = planDs.find(p => p.id === planId);
        if (plan) {
            plan.assignedUserID = currentUser.id;
            plan.assignedUserName = currentUser.fullName;
            triggerToast(`Đã nhận việc cho máy ${plan.deviceCode}`, 'fa-check');
            renderPlanTab();
        }
    }

    // --- 5. TAB 2: THIẾT BỊ ---
    function renderEquipmentTab() {
        const search = (document.getElementById('eq2-filter-search')?.value || '').toLowerCase();
        const compFilter = document.getElementById('eq2-filter-comp')?.value || 'ALL';

        const filtered = devices.filter(d => {
            if (compFilter !== 'ALL' && d.compName !== compFilter) return false;
            if (search && !`${d.deviceCode} ${d.deviceName} ${d.compName}`.toLowerCase().includes(search)) return false;
            return true;
        });

        const mobileList = document.getElementById('equipment-mobile-list');
        const desktopBody = document.getElementById('equipment-table-body');

        mobileList.innerHTML = filtered.map((d, index) => {
            const inps = listInspectionH.filter(h => h.deviceID === d.id).sort((a,b) => new Date(b.inspectionDate) - new Date(a.inspectionDate));
            const latest = inps[0];
            return `
                <div class="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs space-y-1.5 text-xs">
                    <div class="flex items-start justify-between">
                        <div>
                            <span class="font-bold text-sm text-slate-900">${index + 1}. ${d.deviceCode} - ${d.deviceName}</span>
                            <div class="text-slate-500">📍 ${d.compName}</div>
                        </div>
                        <div>${getStatusBadge(latest ? latest.status : 'PENDING')}</div>
                    </div>
                    <div class="flex justify-end gap-1.5 pt-1 border-t border-slate-100">
                        ${inps.length > 0 ? `
                            <button onclick="openInspectionHistoryModal(${d.id})" class="text-blue-600 hover:text-blue-800 font-semibold px-2 py-1">
                                Xem lịch sử (${inps.length})
                            </button>
                        ` : ''}
                        <button onclick="openInspectionModalFromDevice(${d.id})" class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            Kiểm tra
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        desktopBody.innerHTML = filtered.map((d, index) => {
            const inps = listInspectionH.filter(h => h.deviceID === d.id).sort((a,b) => new Date(b.inspectionDate) - new Date(a.inspectionDate));
            const latest = inps[0];
            const dateStr = latest ? new Date(latest.inspectionDate).toLocaleDateString('vi-VN') : '--';
            const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';

            return `
                <tr class="${rowBg} hover:bg-slate-100/60 border-b border-slate-100 transition">
                    <td class="py-2 px-2.5 text-slate-500 font-medium">${index + 1}</td>
                    <td class="py-2 px-2.5 font-bold text-slate-900">${d.deviceCode} - ${d.deviceName}</td>
                    <td class="py-2 px-2.5 text-slate-600">${d.compName}</td>
                    <td class="py-2 px-2.5">${getStatusBadge(latest ? latest.status : 'PENDING')}</td>
                    <td class="py-2 px-2.5 text-slate-700 font-medium">${dateStr}</td>
                    <td class="py-2 px-2.5 text-slate-500 italic text-xs">Theo tuần/tháng</td>
                    <td class="py-2 px-2.5 text-right space-x-1 whitespace-nowrap">
                        <button onclick="openInspectionModalFromDevice(${d.id})" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs">
                            Kiểm tra
                        </button>
                        ${inps.length > 0 ? `
                            <button onclick="openInspectionHistoryModal(${d.id})" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs">
                                Lịch sử (${inps.length})
                            </button>
                        ` : ''}
                        <button onclick="deleteDevice(${d.id})" class="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium text-xs">
                            Xóa
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function deleteDevice(deviceId) {
        if (!confirm('Bạn có chắc muốn xóa thiết bị này?')) return;
        devices = devices.filter(d => d.id !== deviceId);
        planDs = planDs.filter(p => p.deviceID !== deviceId);
        updatePlanCalculations();
        renderEquipmentTab();
        renderPlanTab();
        triggerToast('Đã xóa thiết bị thành công', 'fa-trash');
    }

    // --- 6. TAB 4: BÁO CÁO CA TRỰC ---
    function filterDeviceOnReport(type, value) {
        if (type === 'status') statusFilterDeviceOnReport = value;
        if (type === 'comp') compFilterDeviceOnReport = value;
        if (type === 'search') searchFilterDeviceOnReport = value.toLowerCase();

        // Cập nhật trạng thái active cho nút tab báo cáo
        document.getElementById('rep-btn-all').className = `px-2 py-1 rounded font-medium ${statusFilterDeviceOnReport === 'ALL' ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 border border-slate-300'}`;
        document.getElementById('rep-btn-good').className = `px-2 py-1 rounded font-medium ${statusFilterDeviceOnReport === 'good' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border border-emerald-300'}`;
        document.getElementById('rep-btn-error').className = `px-2 py-1 rounded font-medium ${statusFilterDeviceOnReport === 'error' ? 'bg-rose-600 text-white' : 'bg-white text-rose-700 border border-rose-300'}`;

        renderReportTab();
    }

    function renderReportTab() {
        const total = listDeviceReport.length;
        const goodCount = listDeviceReport.filter(d => d.statusCode === 'good').length;
        const errorCount = listDeviceReport.filter(d => d.statusCode !== 'good').length;

        document.getElementById('count-all').innerText = total;
        document.getElementById('btn-count-all').innerText = total;
        document.getElementById('count-good').innerText = goodCount;
        document.getElementById('btn-count-good').innerText = goodCount;
        document.getElementById('count-error').innerText = errorCount;
        document.getElementById('btn-count-error').innerText = errorCount;

        document.getElementById('pct-good').innerText = total > 0 ? `${Math.round((goodCount/total)*100)}%` : '0%';
        document.getElementById('pct-error').innerText = total > 0 ? `${Math.round((errorCount/total)*100)}%` : '0%';

        const filtered = listDeviceReport.filter(d => {
            if (compFilterDeviceOnReport !== 'ALL' && d.compID.toString() !== compFilterDeviceOnReport) return false;
            if (statusFilterDeviceOnReport === 'good' && d.statusCode !== 'good') return false;
            if (statusFilterDeviceOnReport === 'error' && d.statusCode === 'good') return false;
            if (searchFilterDeviceOnReport) {
                const s = `${d.deviceCode} ${d.deviceName} ${d.compName}`.toLowerCase();
                if (!s.includes(searchFilterDeviceOnReport)) return false;
            }
            return true;
        });

        document.getElementById('report-visible-count').innerText = filtered.length;

        const tbody = document.getElementById('report-table-body');
        tbody.innerHTML = filtered.map((d, index) => {
            const isGood = d.statusCode === 'good';
            return `
                <tr class="${isGood ? '' : 'bg-rose-50/40'} border-b border-slate-200">
                    <td class="p-2 font-bold text-slate-900">${index + 1}</td>
                    <td class="p-2 font-bold text-slate-900">${d.deviceCode}</td>
                    <td class="p-2 font-medium text-slate-800">${d.deviceName}</td>
                    <td class="p-2 text-slate-500">${d.compName}</td>
                    <td class="p-2 text-center">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'} font-semibold">
                            <span class="w-1.5 h-1.5 rounded-full ${isGood ? 'bg-emerald-500' : 'bg-rose-500'}"></span> ${d.statusName}
                        </span>
                    </td>
                    <td class="p-2 text-slate-500">${d.statusDescription || '--'}</td>
                </tr>
            `;
        }).join('');
    }

    // --- 7. MODAL: GHI NHẬN KIỂM TRA (INSPECTION MODAL) ---
    function openInspectionModalFromPlan(planId) {
        const plan = planDs.find(p => p.id === planId);
        if (!plan) return;
        const dev = devices.find(d => d.id === plan.deviceID);
        setupInspectionModal(dev, plan.checklistHID);
    }

    function openInspectionModalFromDevice(deviceId) {
        const dev = devices.find(d => d.id === deviceId);
        if (!dev) return;
        const checklist = checkListHs.find(c => c.deviceIDs.includes(deviceId)) || checkListHs[0];
        setupInspectionModal(dev, checklist ? checklist.id : 0);
    }

    function setupInspectionModal(device, checklistHID) {
        currentInpModalHeader = {
            deviceID: device.id,
            deviceCode: device.deviceCode,
            deviceName: device.deviceName,
            compName: device.compName,
            inspectionDate: new Date().toISOString().split('T')[0],
            checklistHID: checklistHID
        };

        const details = checkListDs.filter(d => d.checklistHID === checklistHID);
        currentInpModalDetails = details.map(item => ({
            checklistDID: item.id,
            itemName: item.itemName,
            checkResult: 'PASS',
            issueDescription: ''
        }));

        document.getElementById('modal-inp-device-title').innerText = `${device.deviceCode} - ${device.deviceName}`;
        document.getElementById('modal-inp-comp').innerText = `Xưởng ${device.compName}`;
        document.getElementById('modal-inp-emp').innerText = currentUser.fullName;
        document.getElementById('modal-inp-date').value = currentInpModalHeader.inspectionDate;
        document.getElementById('modal-inp-notes').value = '';

        renderChecklistTable();
        document.getElementById('modal-inspection').classList.remove('hidden');
    }

    function renderChecklistTable() {
        const body = document.getElementById('modal-inp-checklist-body');
        document.getElementById('modal-inp-checklist-title').innerText = `Tiêu chí kiểm tra (${currentInpModalDetails.length})`;

        body.innerHTML = currentInpModalDetails.map((item, idx) => `
            <tr class="hover:bg-slate-50 border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}">
                <td class="px-1 py-1.5 text-center text-slate-500 font-medium">${idx + 1}</td>
                <td class="px-2 py-1.5 font-medium text-slate-800">${item.itemName}</td>
                <td class="px-2 py-1.5 text-center">
                    <div class="inline-flex rounded border border-slate-200 bg-slate-100 p-0.5">
                        <button type="button" onclick="setCheckResult(${idx}, 'PASS')" class="px-2 py-0.5 rounded text-[10px] font-bold ${item.checkResult === 'PASS' ? 'bg-emerald-600 text-white' : 'text-slate-600'}">ĐẠT</button>
                        <button type="button" onclick="setCheckResult(${idx}, 'FAIL')" class="px-2 py-0.5 rounded text-[10px] font-bold ${item.checkResult === 'FAIL' ? 'bg-rose-600 text-white' : 'text-slate-600'}">LỖI</button>
                    </div>
                </td>
                <td class="px-2 py-1.5">
                    <input type="text" value="${item.issueDescription}" onchange="setCheckNote(${idx}, this.value)" placeholder="Ghi chú..." class="w-full border border-slate-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-blue-500">
                </td>
            </tr>
        `).join('');
    }

    function setCheckResult(index, result) {
        currentInpModalDetails[index].checkResult = result;
        renderChecklistTable();
    }

    function setCheckNote(index, value) {
        currentInpModalDetails[index].issueDescription = value;
    }

    function closeInspectionModal() {
        document.getElementById('modal-inspection').classList.add('hidden');
    }

    function saveInspectionResult() {
        const hasFail = currentInpModalDetails.some(d => d.checkResult === 'FAIL');
        const overallStatus = hasFail ? 'FAIL' : 'PASS';
        const newHid = listInspectionH.length + 1;
        const notes = document.getElementById('modal-inp-notes').value;
        const inpDate = document.getElementById('modal-inp-date').value || new Date().toISOString();

        // 1. Thêm Header
        const newHeader = {
            id: newHid,
            deviceID: currentInpModalHeader.deviceID,
            inspectionDate: `${inpDate}T${new Date().toTimeString().split(' ')[0]}`,
            status: overallStatus,
            createdBy: currentUser.fullName,
            issueDescription: notes
        };
        listInspectionH.push(newHeader);

        // 2. Thêm Details
        currentInpModalDetails.forEach(d => {
            listInspectionD.push({
                inspectionHID: newHid,
                checklistDID: d.checklistDID,
                itemName: d.itemName,
                checkResult: d.checkResult,
                issueDescription: d.issueDescription
            });
        });

        // 3. Đồng bộ lại trạng thái trong Báo Cáo
        const repItem = listDeviceReport.find(r => r.id === currentInpModalHeader.deviceID);
        if (repItem) {
            repItem.statusCode = overallStatus === 'PASS' ? 'good' : 'error';
            repItem.statusName = overallStatus === 'PASS' ? 'Chạy tốt' : 'Đang lỗi';
            repItem.statusDescription = notes || (overallStatus === 'PASS' ? 'Vận hành ổn định' : 'Có tiêu chí không đạt');
        }

        updatePlanCalculations();
        renderPlanTab();
        renderEquipmentTab();
        renderReportTab();
        closeInspectionModal();
        triggerToast('Lưu kết quả kiểm tra thành công!', 'fa-check');
    }

    // --- 8. MODAL: XEM LỊCH SỬ KIỂM TRA ---
    function openInspectionHistoryModal(deviceId) {
        const dev = devices.find(d => d.id === deviceId);
        if (!dev) return;

        currentHistoryHeaders = listInspectionH.filter(h => h.deviceID === deviceId).sort((a,b) => new Date(a.inspectionDate) - new Date(b.inspectionDate));
        if (currentHistoryHeaders.length === 0) {
            triggerToast('Chưa có lịch sử đo cho thiết bị này', 'fa-info');
            return;
        }

        document.getElementById('hist-modal-title').innerText = `${dev.deviceCode} - ${dev.deviceName}`;
        document.getElementById('hist-modal-comp').innerText = `Xưởng ${dev.compName}`;

        selectHistoryRun(currentHistoryHeaders[0].id);
        document.getElementById('modal-history').classList.remove('hidden');
    }

    function selectHistoryRun(headerId) {
        selectedHistoryHeader = currentHistoryHeaders.find(h => h.id === headerId) || currentHistoryHeaders[0];

        // Render Runs Pills
        const pillsContainer = document.getElementById('hist-runs-pills');
        pillsContainer.innerHTML = currentHistoryHeaders.map((h, idx) => {
            const isSelected = h.id === selectedHistoryHeader.id;
            const time = new Date(h.inspectionDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            return `
                <button type="button" onclick="selectHistoryRun(${h.id})"
                    class="shrink-0 p-1.5 rounded-lg font-semibold flex items-center gap-2 border text-xs transition ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'}">
                    <span>Lần ${idx + 1}</span>
                    <span>${time}</span>
                    <span class="px-1.5 py-0.2 rounded font-bold text-[10px] ${h.status === 'PASS' ? (isSelected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700') : (isSelected ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700')}">
                        ${h.status}
                    </span>
                </button>
            `;
        }).join('');

        // Cập nhật thông tin Header
        document.getElementById('hist-emp-name').innerText = selectedHistoryHeader.createdBy;
        document.getElementById('hist-check-date').innerText = new Date(selectedHistoryHeader.inspectionDate).toLocaleString('vi-VN');
        document.getElementById('hist-notes').innerText = selectedHistoryHeader.issueDescription || 'Không có ghi chú sự cố.';

        // Render Details
        const details = listInspectionD.filter(d => d.inspectionHID === selectedHistoryHeader.id);
        const passCount = details.filter(d => d.checkResult === 'PASS').length;
        const failCount = details.filter(d => d.checkResult === 'FAIL').length;
        document.getElementById('hist-details-summary').innerText = `Tiêu chí kiểm tra (${passCount}/${details.length} pass - ${failCount}/${details.length} fail)`;

        const tbody = document.getElementById('hist-table-body');
        tbody.innerHTML = details.map((d, idx) => `
            <tr class="hover:bg-slate-50 border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}">
                <td class="px-1 py-1.5 text-center text-slate-500 font-medium">${idx + 1}</td>
                <td class="px-2 py-1.5 font-medium text-slate-800">${d.itemName}</td>
                <td class="px-2 py-1.5 text-center">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${d.checkResult === 'PASS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${d.checkResult === 'PASS' ? 'ĐẠT' : 'LỖI'}
                    </span>
                </td>
                <td class="px-2 py-1.5 text-slate-600">${d.issueDescription || '--'}</td>
            </tr>
        `).join('');
    }

    function closeInspectionHistoryModal() {
        document.getElementById('modal-history').classList.add('hidden');
    }

    // --- 9. MODAL: THÊM THIẾT BỊ MỚI ---
    function openDeviceModal() {
        document.getElementById('modal-device-code').value = '';
        document.getElementById('modal-device-name').value = '';
        document.getElementById('modal-device-comp').value = '';

        const selChecklist = document.getElementById('modal-device-checklist');
        selChecklist.innerHTML = `<option value="">-- Chọn Tiêu chí --</option>` + checkListHs.map(c => `<option value="${c.id}">${c.checklistName}</option>`).join('');

        document.getElementById('modal-device').classList.remove('hidden');
    }

    function closeDeviceModal() {
        document.getElementById('modal-device').classList.add('hidden');
    }

    function saveChangesDevice() {
        const compVal = document.getElementById('modal-device-comp').value;
        const code = document.getElementById('modal-device-code').value.trim();
        const name = document.getElementById('modal-device-name').value.trim();
        const checklistId = parseInt(document.getElementById('modal-device-checklist').value);

        if (!compVal) { triggerToast('Vui lòng chọn phân xưởng', 'fa-triangle-exclamation'); return; }
        if (!code) { triggerToast('Vui lòng nhập mã thiết bị', 'fa-triangle-exclamation'); return; }
        if (!name) { triggerToast('Vui lòng nhập tên thiết bị', 'fa-triangle-exclamation'); return; }
        if (!checklistId) { triggerToast('Vui lòng chọn checklist tiêu chí', 'fa-triangle-exclamation'); return; }

        const compObj = comps.find(c => c.id.toString() === compVal);
        const newId = devices.length + 1;

        // Thêm vào danh sách thiết bị
        const newDevice = {
            id: newId,
            deviceCode: code,
            deviceName: name,
            compID: compObj.id,
            compName: compObj.name
        };
        devices.push(newDevice);

        // Gắn vào checklist header
        const ch = checkListHs.find(c => c.id === checklistId);
        if (ch) ch.deviceIDs.push(newId);

        // Tạo 1 kế hoạch kiểm tra mặc định
        planDs.push({
            id: planDs.length + 1,
            deviceID: newId,
            checklistHID: checklistId,
            assignedUserID: 0,
            assignedUserName: '',
            status: 'PENDING',
            process: '0/0',
            isShowInspectionHistory: false,
            showInspectionCount: 0
        });

        // Bổ sung vào danh sách báo cáo
        listDeviceReport.push({
            id: newId,
            deviceCode: code,
            deviceName: name,
            compID: compObj.id,
            compName: compObj.name,
            statusCode: 'good',
            statusName: 'Chạy tốt',
            statusDescription: 'Thiết bị mới bổ sung vào xưởng'
        });

        updatePlanCalculations();
        renderEquipmentTab();
        renderPlanTab();
        renderReportTab();
        closeDeviceModal();
        triggerToast('Đã thêm thiết bị thành công!', 'fa-check');
    }

    // --- 10. TOAST NOTIFICATION ---
    function triggerToast(message, icon = 'fa-check') {
        const toast = document.getElementById('toast');
        const msgEl = document.getElementById('toast-msg');
        const iconEl = document.getElementById('toast-icon');

        msgEl.innerText = message;
        iconEl.className = `fa-solid ${icon} text-emerald-400 text-base`;

        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2200);
    }

    // Chạy khi nạp trang
    window.addEventListener('DOMContentLoaded', init);
