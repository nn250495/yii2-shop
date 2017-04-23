if (typeof pistol88 == "undefined" || !pistol88) {
    var pistol88 = {};
}

pistol88.shop = {
    init: function() {
        $(document).on('change', 'table input:checkbox', this.checkSelectedRows);
        $(document).on('click', '.pistol88-mass-delete', this.massDeletion);
        $(document).on('click', '.doc-delete', this.docDeletion);
        $(document).on('click', '.pistoll88-shop-edit-mass-form', this.editingSelectedFields);
        $(document).on('click', '.cm-off', this.uncheckAllCheckboxes);
        $(document).on('click', '.cm-on', this.selectAllCheckboxes);
    },
    editingSelectedFields: function () {
        var model = $(this).data('model'),
            action = $(this).data('action'),
            modelId = [],
            attributes = {},
            filtersId = {},
            fieldsId = {};
        $('table input:checkbox:checked').each(function(){
            modelId.push($(this).val());
        });
        $('.pistol88-mass-edit-filds input:checkbox:checked').each(function(){
            attributes[$(this).val()] = $(this).val();
        });
        $('.pistol88-mass-edit-filters input:checkbox:checked').each(function(){
            filtersId[$(this).val()] = $(this).val();
        });
        $('.pistol88-mass-edit-more-fields input:checkbox:checked').each(function(){
            fieldsId[$(this).val()] = $(this).val();
        });

        if(JSON.stringify(attributes) != "{}" && modelId.length != 0) {
            $.post({
                url: action,
                data: {
                    modelId: modelId,
                    model: model,
                    attributes: attributes,
                    filters: filtersId,
                    fields: fieldsId
                },
            });
        }
    },
    uncheckAllCheckboxes: function () {
        var type = $(this).data('type');
        $('.pistol88-mass-edit-'+type+' input:checkbox:checked').each(function(){
            $(this).prop("checked", false)
        });
    },
    selectAllCheckboxes: function () {
        var type = $(this).data('type');
        $('.pistol88-mass-edit-'+type+' input:checkbox').each(function(){
            $(this).prop("checked", true)
        });
    },
    checkSelectedRows: function () {
        var empty = true;
        $('table input:checkbox').each(function () {
            var checkbox = this;
            if ($(checkbox).prop("checked") === true) {
                empty = false;
                return false;
            }
        });

        if (empty === false) {
            $('.pistol88-mass-controls').removeClass( "disabled");
        } else {
            $('.pistol88-mass-controls').addClass( "disabled");
        }
    },
    massDeletion: function () {
        var model = $(this).data('model');
        var action = $(this).data('action');
        var modelId = [];
        var confirmation = confirm("Удалить выбранные элементы?");
        $('table input:checkbox:checked').each(function(){
            modelId.push($(this).val());
        });

        if(confirmation === true) {
            $.post({
                url: action,
                data: {modelId: modelId, model: model},
                success: function (response) {
                    if(response === true) {
                        location.reload();
                    }
                }
            });
        }
    },
};

pistol88.shop.init();
