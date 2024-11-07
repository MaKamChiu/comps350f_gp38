import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        welcome: 'Welcome',
        admin: 'Admin',
        help: 'Help',
        logout: 'Logout',
        cancel: 'Cancel',
        confirm: 'Confirm',
        startDate: 'Start Date',
        endDate: 'End Date',
        saveChanges: 'Save Changes'
      },
      admin: {
        dashboard: 'Admin Dashboard',
        AddVotingTopic: 'Add Voting Topic',
        endVoting: 'End Voting Session',
        restartVoting: 'Restart Voting',
        overview: 'Overview',
        settings: 'Settings',
        audit: 'Audit Log',
        reports: 'Reports',
        liveResults: 'Live Results',
        votingRules: 'Voting Rules'
      },
      candidates: {
        total: 'Total Candidates',
        manage: 'Manage Candidates'
      },
      voting: {
        TopicName: 'Topic Name',
        Description: 'Description',
        totalVotes: 'Total Votes',
        progress: 'Voting Progress',
        votes: 'votes',
        selectionType: 'Selection Type',
        singleChoice: 'Single Choice',
        multipleChoice: 'Multiple Choice',
        rankedChoice: 'Ranked Choice',
        maxSelections: 'Maximum Selections',
        votingPeriod: 'Voting Period',
        requireVerification: 'Require Voter Verification',
        showResultsLive: 'Show Results Live'
      }
    }
  },
  es: {
    translation: {
      common: {
        welcome: 'Bienvenido',
        admin: 'Administrador',
        help: 'Ayuda',
        logout: 'Cerrar sesión',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        startDate: 'Fecha de inicio',
        endDate: 'Fecha de fin',
        saveChanges: 'Guardar cambios'
      },
      admin: {
        dashboard: 'Panel de administración',
        AddVotingTopic: 'Agregar tema de votación',
        endVoting: 'Finalizar votación',
        restartVoting: 'Reiniciar votación',
        overview: 'Resumen',
        settings: 'Configuración',
        audit: 'Registro de auditoría',
        reports: 'Informes',
        liveResults: 'Resultados en vivo',
        votingRules: 'Reglas de votación'
      },
      candidates: {
        total: 'Total de candidatos',
        manage: 'Gestionar candidatos'
      },
      voting: {
        TopicName: 'Nombre del tema',
        Description: 'Descripción',
        totalVotes: 'Votos totales',
        progress: 'Progreso de votación',
        votes: 'votos',
        selectionType: 'Tipo de selección',
        singleChoice: 'Selección única',
        multipleChoice: 'Selección múltiple',
        rankedChoice: 'Selección ordenada',
        maxSelections: 'Selecciones máximas',
        votingPeriod: 'Período de votación',
        requireVerification: 'Requerir verificación de votante',
        showResultsLive: 'Mostrar resultados en vivo'
      }
    }
  },
  zh: {
    translation: {
      common: {
        welcome: '欢迎',
        admin: '管理员',
        help: '帮助',
        logout: '退出',
        cancel: '取消',
        confirm: '确认',
        startDate: '开始日期',
        endDate: '结束日期',
        saveChanges: '保存更改'
      },
      admin: {
        dashboard: '管理面板',
        AddVotingTopic: '新增投票主題',
        endVoting: '结束投票',
        restartVoting: '重新开始投票',
        overview: '概览',
        settings: '设置',
        audit: '审计日志',
        reports: '报告',
        liveResults: '实时结果',
        votingRules: '投票规则'
      },
      candidates: {
        total: '候选人总数',
        manage: '管理候选人'
      },
      voting: {
        TopicName: '主题名称',
        Description: '描述',
        totalVotes: '总票数',
        progress: '投票进度',
        votes: '票',
        selectionType: '选择类型',
        singleChoice: '单选',
        multipleChoice: '多选',
        rankedChoice: '排序选择',
        maxSelections: '最大选择数',
        votingPeriod: '投票期限',
        requireVerification: '需要选民验证',
        showResultsLive: '实时显示结果'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;